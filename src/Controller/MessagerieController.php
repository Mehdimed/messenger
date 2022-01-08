<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessagerieController extends AbstractController
{
    /**
     * @Route("/secure/conversations", name="conversations")
     */
    public function index(ConversationRepository $convRepo): Response
    {
        $user = $this->getUser();

        // $conversation = new Conversation();

        // $conversation
        //     ->addParticipant($user)
        //     ->setTitre('la première conversation');

        //     $em->persist($conversation);
        //     $em->flush();

        $conversations = $user->getConversations();


        return $this->render('messagerie/index.html.twig', [
            'conversations' => $conversations,
        ]);
    }
}
