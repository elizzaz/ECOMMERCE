<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Order;
use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrderController extends AbstractController
{

    /**
     * Get one orders from a client
     */
    #[Route('/api/order', name: 'get_one_order_of_client', methods: ['GET'], requirements: ['orderId' => '\d+'])]
    public function get_one_order_of_client(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        if (($orders = $doctrine->getRepository(Order::class)->find($_GET['orderId'])) === null) {
            return new Response("This order does not exist", 400, []);
        }
        $list_product = array();
        $allOrder = array();
        foreach ($orders->getProducts() as $obj) {
            $product = $doctrine->getRepository(Product::class)->find($obj);
            array_push($list_product, [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'picture' => $product->getPicture(),
                'price' => $product->getPrice(),
            ]);
        }
        array_push($allOrder, [
            'id' => $orders->getId(),
            'totalPrice' => $orders->getTotalPrice(),
            'creationDate' => $orders->getCreactionDate(),
            'product' => $list_product                
        ]);
        return new Response($serializer->serialize($allOrder, 'json', ['groups' => 'readCart']), 200);
    }

    /**
     * Get all orders from a client
     */
    #[Route('/api/orders', name: 'get_all_order_of_client', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function get_all_order_of_client(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        $clientRepository = $doctrine->getRepository(User::class);
        if ($clientRepository->find($_GET['id']) === null) {
            return new Response("The user does not exist", 400, []);
        }
        if (($orders = $doctrine->getRepository(Order::class)->findBy(array('client' => $_GET['id']))) === null) {
            return new Response("The user does not have orders", 204, []);
        }
        $allOrder = array();
        foreach ($orders as $object) {
            $list_product = array();
            foreach ($object->getProducts() as $obj) {
                $product = $doctrine->getRepository(Product::class)->find($obj);
                array_push($list_product, [
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'description' => $product->getDescription(),
                    'picture' => $product->getPicture(),
                    'price' => $product->getPrice(),
                ]);
            }
            array_push($allOrder, [
                'id' => $object->getId(),
                'totalPrice' => $object->getTotalPrice(),
                'creationDate' => $object->getCreactionDate(),
                'product' => $list_product                
            ]);
        }
        return new Response($serializer->serialize($allOrder, 'json', ['groups' => 'readCart']), 200);
    }
}
