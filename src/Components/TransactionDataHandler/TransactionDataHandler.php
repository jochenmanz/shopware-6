<?php

declare(strict_types=1);

namespace PayonePayment\Components\TransactionDataHandler;

use DateTime;
use PayonePayment\Installer\CustomFieldInstaller;
use PayonePayment\Payone\Struct\PaymentTransaction;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\System\StateMachine\Aggregation\StateMachineState\StateMachineStateEntity;

class TransactionDataHandler implements TransactionDataHandlerInterface
{
    /** @var EntityRepositoryInterface */
    private $transactionRepository;

    public function __construct(EntityRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function saveTransactionData(PaymentTransaction $transaction, Context $context, array $data): void
    {
        if (null === $transaction->getOrderTransaction()) {
            return;
        }

        $customFields = $transaction->getOrderTransaction()->getCustomFields() ?? [];
        $customFields = array_merge($customFields, $data);

        $update = [
            'id'           => $transaction->getOrderTransaction()->getId(),
            'customFields' => $customFields,
        ];

        $transaction->getOrderTransaction()->setCustomFields($customFields);
        $transaction->setCustomFields($customFields);

        $this->transactionRepository->update([$update], $context);
    }

    public function logResponse(PaymentTransaction $transaction, Context $context, array $response): void
    {
        if (null === $transaction->getOrderTransaction()) {
            return;
        }

        $customFields = $transaction->getOrderTransaction()->getCustomFields() ?? [];

        $key = (new DateTime())->format(DATE_ATOM);

        $customFields[CustomFieldInstaller::TRANSACTION_DATA][$key] = $response;

        $update = [
            'id'           => $transaction->getOrderTransaction()->getId(),
            'customFields' => $customFields,
        ];

        $transaction->getOrderTransaction()->setCustomFields($customFields);
        $transaction->setCustomFields($customFields);

        $this->transactionRepository->update([$update], $context);
    }

    public function incrementSequenceNumber(PaymentTransaction $transaction, Context $context): void
    {
        if (null === $transaction->getOrderTransaction()) {
            return;
        }

        $customFields = $transaction->getOrderTransaction()->getCustomFields() ?? [];

        ++$customFields[CustomFieldInstaller::SEQUENCE_NUMBER];

        $update = [
            'id'           => $transaction->getOrderTransaction()->getId(),
            'customFields' => $customFields,
        ];

        $transaction->getOrderTransaction()->setCustomFields($customFields);
        $transaction->setCustomFields($customFields);

        $this->transactionRepository->update([$update], $context);
    }

    public function setState(PaymentTransaction $transaction, Context $context, StateMachineStateEntity $state): void
    {
        if (null === $transaction->getOrderTransaction()) {
            return;
        }

        $data = [
            'id'      => $transaction->getOrderTransaction()->getId(),
            'stateId' => $state->getId(),
        ];

        $this->transactionRepository->update([$data], $context);
    }
}