<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups("readCart", "readUser")]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("readUser")]
    private $login;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("readUser")]
    private $email;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("readUser")]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("readUser")]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("readUser")]
    private $lastname;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Order::class)]
    private $orders;

    #[ORM\OneToOne(mappedBy: 'client_id', targetEntity: Cart::class, cascade: ['persist', 'remove'])]
    private $cart;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setClient($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getClient() === $this) {
                $order->setClient(null);
            }
        }

        return $this;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(Cart $cart): self
    {
        // set the owning side of the relation if necessary
        if ($cart->getClientId() !== $this) {
            $cart->setClientId($this);
        }

        $this->cart = $cart;

        return $this;
    }
}
