<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\Product;

use App\Repository\CartRepository;
use App\Repository\OrderRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartController extends AbstractController
{

    /**
     * Validate the cart and transorm it to an valid order
     */
    #[Route('/api/cart/validate', name: 'validate_cart', methods: ['POST'])]
    public function validate_cart(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        if (($client = $doctrine->getRepository(User::class)->find($_POST['clientId'])) === null)
            return new Response("The client or/and the product does not exist", 400, []);
        $cart = $client->getCart();
        $order = new Order();
        $orderRepository = new OrderRepository($doctrine);
        $orderRepository->add($order->setClient($client)->setTotalPrice($cart->getTotalPrice())->setCreactionDate(new \DateTime(date("Y-m-d H:i:s")))->setProducts($cart->getProduct())->setProducts($cart->getProduct()));
        $cart->setTotalPrice(0)->setProduct([]);
        $doctrine->getManager()->flush();
        return new Response("The cart of your client has been transorm into an order", 201, []);
    }

    /**
     * Delete a product from the cart
     */
    #[Route('/api/cart', name: 'delete_product_in_cart', methods: ['DELETE'], requirements: ['clientId' => '\d+', 'productId' => '\d+'])]
    public function delete_product_in_cart(ManagerRegistry $doctrine): Response
    {
        if ($doctrine->getRepository(User::class)->find(Request::createFromGlobals()->query->get('clientId')) === null || ($product = $doctrine->getRepository(Product::class)->find(Request::createFromGlobals()->query->get('productId'))) === null)
        return new Response("The client or/and the product does not exist", 400, []);
        if(($cart = $doctrine->getRepository(Cart::class)->findOneBy(array('client_id' => Request::createFromGlobals()->query->get('clientId')))) === null) {
            return new Response("The cart of this customer does not exist, please create a new one", 400, []);
        } else {
            $list_product = $cart->getProduct();
            if (in_array((string)$product->getId(), $list_product, true) == false) {
                return new Response("The product isn't in the list of products", 400, []);
            }
            array_splice($list_product,  array_search((string)$product->getId(), $list_product), 1);
            $cart->setProduct($list_product);
            $doctrine->getManager()->flush();
            return new Response("The cart has been update", 200, []);
        }
    }

    /**
     * Add products to the cart and create a new cart if it does not exist
     */
    #[Route('/api/cart', name: 'add_product_in_cart', methods: ['POST'], requirements: ['clientId' => '\d+', 'productId' => '\d+'])]
    public function add_product_in_cart(ManagerRegistry $doctrine): Response
    {
        if (($client = $doctrine->getRepository(User::class)->find($_POST['clientId'])) === null || ($product = $doctrine->getRepository(Product::class)->find($_POST['productId'])) === null)
            return new Response("The client or/and the product does not exist", 400, []);
        if(($cart = $doctrine->getRepository(Cart::class)->findOneBy(array('client_id' => $_POST['clientId']))) === null) {
            $cartRepository = new CartRepository($doctrine);
            $new_cart = new Cart();
            $cartRepository->add($new_cart->setClientId($client)->setTotalPrice($product->getPrice())->setProduct([(string)$product->getId()]));
            $doctrine->getManager()->flush();
            return new Response("The cart has been create and update", 201, []);
        } else {
            $cart->setTotalPrice($cart->getTotalPrice() + $product->getPrice());
            $productList = $cart->getProduct();
            array_push($productList, (string)$product->getId());
            $cart->setProduct($productList);
            $doctrine->getManager()->flush();
            return new Response("The cart has been update", 200, []);
        }
    }

    /**
     * Get the cart of a client
     */
    #[Route('/api/cart', name: 'get_product_in_cart', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function get_product_in_cart(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        $clientRepository = $doctrine->getRepository(User::class);
        if ($clientRepository->find($_GET['id']) === null) {
            return new Response("The user does not exist", 400, []);
        }
        if (($cart = $doctrine->getRepository(Cart::class)->findOneBy(array('client_id' => $_GET['id']))) === null) {
            return new Response("The user does not have a cart", 204, []);
        }
        $totalPrice = 0;
        $list_product = array();
        $i = 0;
        foreach ($cart->getProduct() as $obj) {
            $product = $doctrine->getRepository(Product::class)->find($obj);
            $list_product[$i] = $product;
            $totalPrice += $product->getPrice();
            $i++;
        }
        $res = (object) [
            'id' => $cart->getId(),
            'clientId' => $cart->getClientId()->getId(),
            'totalPrice' => $totalPrice,
            'listProduct' => $list_product,
        ];
        return new Response($serializer->serialize($res, 'json'), 200);
    }
}
