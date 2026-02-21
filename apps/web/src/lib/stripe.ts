/**
 * Stripe integration stub.
 *
 * This module will be populated when Stripe is fully integrated.
 * For now it exports placeholder types and functions.
 */

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
export const STRIPE_PRICE_ID_MONTHLY = process.env.STRIPE_PRICE_ID_MONTHLY || "";

/**
 * Create a Stripe checkout session (stub).
 * Will be implemented when Stripe keys are configured.
 */
export async function createCheckoutSession(_userId: string): Promise<string | null> {
  // TODO: Implement with @stripe/stripe-js when ready
  console.warn("Stripe checkout not yet configured");
  return null;
}
