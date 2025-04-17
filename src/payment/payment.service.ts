import { Injectable } from '@nestjs/common';
import { AmountDetails, AutomaticPaymentMethods, Card, CreatePaymentDto, Link, Metadata, PaymentMethodConfigurationDetails, PaymentMethodOptions } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_TEST_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not defined. Please set STRIPE_SECRET_KEY or STRIPE_TEST_SECRET_KEY in your environment variables.');
    }

    console.log('Using Stripe key:', stripeSecretKey.startsWith('sk_live') ? 'LIVE MODE' : 'TEST MODE');

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string): Promise<CreatePaymentDto> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Map the Stripe response to CreatePaymentDto
    const paymentDto: CreatePaymentDto = {
      id: paymentIntent.id,
      object: paymentIntent.object,
      amount: paymentIntent.amount,
      amount_capturable: paymentIntent.amount_capturable,
      amount_details: this.mapAmountDetails(paymentIntent.amount_details),
      amount_received: paymentIntent.amount_received,
      // application: paymentIntent.application,
      application_fee_amount: paymentIntent.application_fee_amount,
      automatic_payment_methods: this.mapAutomaticPaymentMethods(paymentIntent.automatic_payment_methods),
      canceled_at: paymentIntent.canceled_at,
      cancellation_reason: paymentIntent.cancellation_reason,
      capture_method: paymentIntent.capture_method,
      client_secret: paymentIntent.client_secret,
      confirmation_method: paymentIntent.confirmation_method,
      created: paymentIntent.created,
      currency: paymentIntent.currency,
      // customer: paymentIntent.customer,
      description: paymentIntent.description,
      // invoice: paymentIntent.invoice,
      // last_payment_error: paymentIntent.last_payment_error,
      // latest_charge: paymentIntent.latest_charge,
      livemode: paymentIntent.livemode,
      metadata: this.mapMetadata(paymentIntent.metadata),
      // next_action: paymentIntent.next_action,
      // on_behalf_of: paymentIntent.on_behalf_of,
      // payment_method: paymentIntent.payment_method,
      payment_method_configuration_details: this.mapPaymentMethodConfigurationDetails(paymentIntent.payment_method_configuration_details),
      payment_method_options: this.mapPaymentMethodOptions(paymentIntent.payment_method_options),
      payment_method_types: paymentIntent.payment_method_types,
      // processing: paymentIntent.processing,
      receipt_email: paymentIntent.receipt_email,
      // review: paymentIntent.review,
      setup_future_usage: paymentIntent.setup_future_usage,
      // shipping: paymentIntent.shipping,
      // source: paymentIntent.source,
      statement_descriptor: paymentIntent.statement_descriptor,
      statement_descriptor_suffix: paymentIntent.statement_descriptor_suffix,
      status: paymentIntent.status,
      // transfer_data: paymentIntent.transfer_data,
      transfer_group: paymentIntent.transfer_group,
    };

    return paymentDto;
  }

  private mapAmountDetails(amountDetails: any): AmountDetails {
    return {
      tip: amountDetails?.tip ? this.mapMetadata(amountDetails.tip) : new Metadata(),
    };
  }

  private mapAutomaticPaymentMethods(automaticPaymentMethods: any): AutomaticPaymentMethods {
    return {
      allow_redirects: automaticPaymentMethods?.allow_redirects || '',
      enabled: automaticPaymentMethods?.enabled || false,
    };
  }

  private mapPaymentMethodConfigurationDetails(paymentMethodConfigurationDetails: any): PaymentMethodConfigurationDetails {
    return {
      id: paymentMethodConfigurationDetails?.id || '',
      parent: paymentMethodConfigurationDetails?.parent || null,
    };
  }

  private mapPaymentMethodOptions(paymentMethodOptions: any): PaymentMethodOptions {
    return {
      card: this.mapCard(paymentMethodOptions.card),
      link: this.mapLink(paymentMethodOptions.link),
    };
  }

  private mapCard(card: any): Card {
    return {
      installments: card?.installments || null,
      mandate_options: card?.mandate_options || null,
      network: card?.network || null,
      request_three_d_secure: card?.request_three_d_secure || '',
    };
  }

  private mapLink(link: any): Link {
    return {
      persistent_token: link?.persistent_token || null,
    };
  }

  private mapMetadata(metadata: any): Metadata {
    return metadata || new Metadata();
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
