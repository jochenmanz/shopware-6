<?php

declare(strict_types=1);

namespace PayonePayment\Components\PaymentHandler\Capture;

use Shopware\Core\Framework\Context;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\ParameterBag;

interface CapturePaymentHandlerInterface
{
    public function fullCapture(ParameterBag $parameterBag, Context $context): JsonResponse;

    public function partialCapture(ParameterBag $parameterBag, Context $context): JsonResponse;
}
