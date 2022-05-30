<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{

    /**
     * Update info on a client
     */
    #[Route('/api/user', name: 'update_client_info', methods: 'PATCH')]
    public function update_client_info(ManagerRegistry $doctrine, SerializerInterface $serializer, Request $request): Response
    {
        if ($request->get('id') == null || ($client = $doctrine->getRepository(User::class)->findOneBy(array('id' => $request->get('id')))) == null) {
            return new Response("The client does not exist or the id is null", 400, []);
        }
        if($request->get('login')) $client->setLogin($request->get('login'));
        if($request->get('password')) $client->setPassword($request->get('password'));
        if($request->get('firstname')) $client->setFirstname($request->get('firstname'));
        if($request->get('lastname')) $client->setLastname($request->get('lastname'));
        $doctrine->getManager()->flush();
        return new Response("The client was successfully updated", 200, []);
    }

    /**
     * Get info on a client
     */
    #[Route('/api/user', name: 'get_client_info', methods: 'GET', requirements: ['id' => '\d+'])]
    public function get_client_info(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        if (($client = $doctrine->getRepository(User::class)->findOneBy(array('id' => $_GET['id']))) == null) {
            return new Response("The client does not exist", 400, []);
        }
        return new Response($serializer->serialize($client, 'json', ['groups' => 'readUser']), 200, []);
    }

    /**
     * Add a client
     */
    #[Route('/api/register', name: 'add_client', methods: 'POST', requirements: ['login' => '\d+', 'password'=> '\d+', 'email'  => '\d+', 'firstname'  => '\d+', 'lastname'  => '\d+'])]
    public function add_client(ManagerRegistry $doctrine): Response
    {

        if ($doctrine->getRepository(User::class)->findOneBy(array('email' => $_POST['email'], 'login' => $_POST['login'])) != null) {
            return new Response("The client was already registered, please login", 400, []);
        }
        $new_client = new User();
        $entityUser = new UserRepository($doctrine);
        $entityUser->add($new_client->setLogin($_POST['login'])->setPassword($_POST['password'])->setEmail($_POST['email'])->setFirstname($_POST['firstname'])->setLastname($_POST['lastname']));
        return new Response("The clien was successfully created", 201, []);
    }

    /**
     * Login a client
     */
    // #[Route('/api/login', name: 'login_client', methods: 'POST', requirements: ['login' => '\d+', 'password'=> '\d+', 'email'  => '\d+'])]
    // public function login_client(ManagerRegistry $doctrine): Response
    // {
    //     return new Response("The client is login", 201, []);
    // }
    
    /**
     * login a client
     */
    #[Route('/api/login', name: 'username_client', methods: 'POST', requirements: ['password'=> '\d+', 'email'  => '\d+'])]
    public function username_client(ManagerRegistry $doctrine, SerializerInterface $serializer): Response
    {
        if (($client = $doctrine->getRepository(User::class)->findOneBy(array('email' => $_POST['email']))) == null) {
            return new Response($serializer->serialize([
                "code" => 400,
                "message" => "The client does not exist, please register"
            ], "json"), 400, []);
        }
        if ($client->getPassword() != $_POST['password']) {
            return new Response($serializer->serialize([
                "code" => "400",
                "message" => "Invalid password"
            ], "json"), 400, []);
        }
        return new Response($serializer->serialize([
            "id_client" => $client->getId(),
            "code" => "200",
            "message" => "The client is logged in successfully"
        ], "json"), 200, []);
    }
}
