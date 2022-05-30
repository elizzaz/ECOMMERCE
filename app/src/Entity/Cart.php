<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToOne(inversedBy: 'total_price', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private $client_id;

    #[ORM\Column(type: 'decimal', precision: 12, scale: 2)]
    private $total_price;

    #[ORM\Column(type: 'array')]
    private $product = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClientId(): ?User
    {
        return $this->client_id;
    }

    public function setClientId(User $client_id): self
    {
        $this->client_id = $client_id;

        return $this;
    }

    public function getTotalPrice(): ?string
    {
        return $this->total_price;
    }

    public function setTotalPrice(string $total_price): self
    {
        $this->total_price = $total_price;

        return $this;
    }

    public function getProduct(): ?array
    {
        return $this->product;
    }

    public function setProduct(array $product): self
    {
        $this->product = $product;

        return $this;
    }
}
