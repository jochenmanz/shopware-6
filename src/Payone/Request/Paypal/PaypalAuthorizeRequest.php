<?php

declare(strict_types=1);

namespace PayonePayment\Payone\Request\Paypal;

use PayonePayment\Struct\PaymentTransaction;
use Shopware\Core\Framework\Context;

class PaypalAuthorizeRequest extends AbstractPaypalAuthorizeRequest
{
    public function getRequestParameters(PaymentTransaction $transaction, Context $context, ?string $workOrderId = null): array
    {
        return array_merge(parent::getRequestParameters($transaction, $context, $workOrderId), [
            'request' => 'authorization',
        ]);
    }
}
