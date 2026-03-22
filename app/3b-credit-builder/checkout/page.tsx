export default function CheckoutPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>3B Credit Builder – Checkout</h1>
      <p>This page proves routing is live.</p>
      <a
        href="/api/3b/create-checkout-session"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#000',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 6,
        }}
      >
        Go to Stripe Checkout
      </a>
    </div>
  );
}
