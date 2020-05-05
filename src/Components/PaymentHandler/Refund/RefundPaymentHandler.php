<?php

declare(strict_types=1);

namespace PayonePayment\Components\PaymentHandler\Refund;

use Exception;
use PayonePayment\Components\PaymentHandler\AbstractPaymentHandler;
use PayonePayment\Components\TransactionDataHandler\TransactionDataHandlerInterface;
use PayonePayment\Components\TransactionStatus\TransactionStatusServiceInterface;
use PayonePayment\Installer\CustomFieldInstaller;
use PayonePayment\Payone\Client\Exception\PayoneRequestException;
use PayonePayment\Payone\Client\PayoneClientInterface;
use PayonePayment\Payone\Request\Refund\RefundRequestFactory;
use PayonePayment\Struct\PaymentTransaction;
use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionEntity;
use Shopware\Core\Checkout\Payment\Exception\InvalidOrderException;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\StateMachine\Aggregation\StateMachineTransition\StateMachineTransitionActions;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Response;

class RefundPaymentHandler extends AbstractPaymentHandler implements RefundPaymentHandlerInterface
{
    protected const AMOUNT_CUSTOM_FIELD = CustomFieldInstaller::REFUNDED_AMOUNT;
    protected const QUANTITY_CUSTOM_FIELD = CustomFieldInstaller::REFUNDED_QUANTITY;

    /** @var TransactionStatusServiceInterface */
    private $transactionStatusService;

    public function __construct(
        RefundRequestFactory $requestFactory,
        PayoneClientInterface $client,
        TransactionDataHandlerInterface $dataHandler,
        TransactionStatusServiceInterface $transactionStatusService,
        EntityRepositoryInterface $transactionRepository,
        EntityRepositoryInterface $orderLineItemRepository
    ) {
        $this->requestFactory           = $requestFactory;
        $this->client                   = $client;
        $this->dataHandler              = $dataHandler;
        $this->transactionRepository    = $transactionRepository;
        $this->orderLineItemRepository  = $orderLineItemRepository;
        $this->transactionStatusService = $transactionStatusService;
    }

    /**
     * {@inheritdoc}
     */
    public function fullRefund(ParameterBag $parameterBag, Context $context): JsonResponse
    {
        $requestResponse = $this->fullRequest($parameterBag, $context);

        if(!$this->isValidRequestResponse($requestResponse)) {
            return $requestResponse;
        }

        $this->postRequestHandling($this->paymentTransaction->getOrderTransaction()->getAmount()->getTotalPrice());

        $this->transactionStatusService->transitionByName(
            $context,
            $this->paymentTransaction->getOrderTransaction()->getId(),
            StateMachineTransitionActions::ACTION_REFUND
        );

        return $requestResponse;
    }

    /**
     * {@inheritdoc}
     */
    public function partialRefund(ParameterBag $parameterBag, Context $context): JsonResponse
    {
        $requestResponse = $this->partialRequest($parameterBag, $context);

        if(!$this->isValidRequestResponse($requestResponse)) {
            return $requestResponse;
        }

        $this->postRequestHandling((float)$parameterBag->get('captureAmount'));
        $this->orderLineHandling($parameterBag->get('orderLines'));
        $this->transactionStatusService->transitionByName(
            $context,
            $this->paymentTransaction->getOrderTransaction()->getId(),
        StateMachineTransitionActions::ACTION_REFUND_PARTIALLY
        );

        return $requestResponse;
    }
}
