<?php
namespace App\Utils;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Common\Annotations\AnnotationReader;


/**
 * Class permettant de sérialiser n’importe quelle donnée
 * @method void getJson($data, $group = null)
 * @method void getStdClass($data, $group = null)
 */
class SerializerHelper
{
    private $classMetadataFactory;

    private $normalizers;

    private $encoders;

    private $serializer;

    public function __construct ()
    {
        $this->classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $this->normalizers          = [(new DateTimeNormalizer()), (new ObjectNormalizer($this->classMetadataFactory))];
        $this->encoders             = [(new JsonEncoder())];
        $this->serializer           = new Serializer($this->normalizers, $this->encoders);
    }

    /**
     * Serialize une donnée en json
     * @params mixed $data La donnée a serializer
     * @params string|string[] $group Dans le cas d'une serialisation d'une entity, le group des variables à afficher
     * @return string
     */
    public function getJson ($data, $group = null) :string
    {
        $group = $group ? [
            'groups' => is_array($group) ? $group : [$group]
        ] : [];

        return $this->serializer->serialize($data, 'json', $group);
    }

    /**
     * Serialize une donnée en stdClass
     * @params mixed $data La donnée a serializer
     * @params string|string[] $group Dans le cas d'une serialisation d'une entity, le group des variables à afficher
     * @return \stdClass
     */
    public function getStdClass ($data, $group = null) :\stdClass
    {
        return json_decode($this->getJson($data, $group));
    }
}