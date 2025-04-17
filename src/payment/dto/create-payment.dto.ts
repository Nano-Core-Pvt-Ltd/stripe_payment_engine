export class CreatePaymentDto {
    id: string;
    object: string;
    amount: number;
    amount_capturable: number;
    amount_details: AmountDetails;
    amount_received: number;
    // application: string | null;
    application_fee_amount: number | null;
    automatic_payment_methods: AutomaticPaymentMethods;
    canceled_at: number | null;
    cancellation_reason: string | null;
    capture_method: string;
    client_secret: string | null;
    confirmation_method: string;
    created: number;
    currency: string;
    // customer?: string;
    description: string | null;
    // invoice: string;
    // last_payment_error: string;
    // latest_charge: string;
    livemode: boolean;
    metadata: Metadata;
    // next_action: string;
    // on_behalf_of: string;
    // payment_method: string;
    payment_method_configuration_details: PaymentMethodConfigurationDetails;
    payment_method_options: PaymentMethodOptions;
    payment_method_types: string[];
    // processing: string;
    receipt_email: string | null;
    // review: string;
    setup_future_usage: string | null;
    // shipping: string;
    // source: string;
    statement_descriptor: string | null;
    statement_descriptor_suffix: string | null;
    status: string;
    // transfer_data: string;
    transfer_group: string | null;
}

export class AmountDetails {
    tip: Metadata;
}

export class Metadata {
}

export class AutomaticPaymentMethods {
    allow_redirects: string;
    enabled: boolean;
}

export class PaymentMethodConfigurationDetails {
    id: string;
    parent: null;
}

export class PaymentMethodOptions {
    card: Card;
    link: Link;
}

export class Card {
    installments: null;
    mandate_options: null;
    network: null;
    request_three_d_secure: string;
}

export class Link {
    persistent_token: null;
}
