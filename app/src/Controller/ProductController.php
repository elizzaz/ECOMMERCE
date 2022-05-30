<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    
    /**
     * Update a product
     */
    #[Route('/api/products', name: 'update_product', methods: 'PATCH', requirements: ['id' => '\d+'])]
    public function update_product(ManagerRegistry $doctrine): Response
    {
        $product = $doctrine->getRepository(Product::class)->find(Request::createFromGlobals()->query->get('id'));
        if ($product === null) {
            return new Response("The product don't exist", 400, []);
        } else {
            if (( $name = Request::createFromGlobals()->query->get('name')) != null) {$product->setName($name);}
            if (( $description  = Request::createFromGlobals()->query->get('description')) != null) {$product->setDescription($description);}
            if (( $picture  = Request::createFromGlobals()->query->get('picture')) != null) {$product->setPicture($picture);}
            if (( $price  = Request::createFromGlobals()->query->get('price')) != null) {$product->setPrice($price);}
            $doctrine->getManager()->flush();
            return new Response("The product has been update successfully", 200, []);
        }
    }

    /**
     * Delete a product
     */
    #[Route('/api/products', name: 'delete_product', methods: 'DELETE', requirements: ['id' => '\d+'])]
    public function delete_product(ManagerRegistry $doctrine): Response
    {
        $product = $doctrine->getRepository(Product::class)->find(Request::createFromGlobals()->query->get('id'));
        if ($product === null) {
            return new Response("The product don't exist or it has already delete", 400, []);
        } else {
            $entityRepository = new ProductRepository($doctrine);
            $entityRepository->remove($product);
            return new Response("The product has been delete successfully", 200, []);
        }
    }

    /**
     * Add a product
     */
    #[Route('/api/products', name: 'add_product', methods: 'POST', requirements: ['name' => '\d+', 'description'=> '\d+', 'picture'  => '\d+', 'price'  => '\d+'])]
    public function add_product(ManagerRegistry $doctrine): Response
    {
        if ($_POST['name'] === NULL || $_POST['description'] === NULL || $_POST['picture'] === NULL || $_POST['price'] === NULL)
            return new Response("Invalid parameters, one of them must be null or empty", 400, []);
        $entityRepository = new ProductRepository($doctrine);
        $new_product = new Product();
        $entityRepository->add($new_product->setName($_POST['name'])->setDescription($_POST['description'])->setPicture($_POST['picture'])->setPrice($_POST['price']), true);
        return new Response("The prodcut has been add successfuly", 201, []);
    }

    /**
     * Get a specific product from his id
     */

    #[Route('/api/products/{id}', name: 'one_product', methods:'GET')]
    public function one_product(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        $entityRepository = $doctrine->getRepository(Product::class);
        $res = $serializer->serialize($entityRepository->find(Request::createFromGlobals()->query->get('id')), 'json');
        if ($res === 'null') {
            return new Response("The product does not exist", 400, []);
        } else {
            return new Response($res, 200, []);
        }
    }

    /**
     * Get all products
     */

    #[Route('/api/products', name: 'list_product', methods:'GET')]
    public function list_product(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        return new Response($serializer->serialize($doctrine->getRepository(Product::class)->findAll(), 'json'), 200);
    }
}
