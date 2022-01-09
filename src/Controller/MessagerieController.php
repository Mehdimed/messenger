<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Utils\SerializerHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/secure")
 */
class MessagerieController extends AbstractController
{

    public function __construct(SerializerHelper $serializerHelper)
    {
        $this->serializerHelper = $serializerHelper;
    }
    /**
     * @Route("/conversations", name="messagerie")
     */
    public function index(EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

        // $conversation = new Conversation();

        // $conversation
        //     ->addParticipant($user)
        //     ->setTitre('la deuxieme conversation');

        //     $em->persist($conversation);
        //     $em->flush();

        // $conversations = $user->getConversations();

        return $this->render('secure/messagerie/index.html.twig', []);
    }

    /**
     * @Route("/conversations/{conversation}", name="messagerie_conversation")
     */
    public function getConversation(Conversation $conversation)
    {
        $user = $this->getUser();

        $data = $this->serializerHelper->getStdClass($conversation , 'conversation:read');

        return new JsonResponse($data);
    }

     /**
     * @Route("/conversation/{conversation}/message", methods={"POST"}, name="messagerie_conversation_ajout_message")
     */
    public function ajoutMessage(Conversation $conversation, Request $request, EntityManagerInterface $em)
    {
        $user = $this->getUser();
        $messageText = $request->request->get('text-message');
        
        $message = new Message();
        $message
            ->setConversation($conversation)
            ->setEmetteur($user)
            ->setMessage($messageText);

        $em->persist($message);
        $em->flush();


        return new JsonResponse('message envoyé');
    }
}
