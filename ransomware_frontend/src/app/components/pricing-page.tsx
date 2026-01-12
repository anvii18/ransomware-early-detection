import { Check } from 'lucide-react';

export function PricingPage() {
  const plans = [
    {
      name: 'Free Trial',
      price: '₹0',
      duration: '1 month',
      description: 'Full access to all features',
      features: [
        'Real-time ransomware detection',
        'Automatic kill switch',
        'Behavioral analysis',
        'Email alerts',
        'Basic reporting',
        'Community support'
      ],
      highlighted: false
    },
    {
      name: '1 Year',
      price: '₹1,500',
      duration: 'per year',
      description: 'Complete protection for your business',
      features: [
        'Everything in Free Trial',
        'Priority support',
        'Advanced analytics',
        'Custom alert rules',
        'API access',
        'Multi-device monitoring',
        'Quarterly security reports'
      ],
      highlighted: true
    },
    {
      name: '2 Year',
      price: '₹3,000',
      duration: 'per 2 years',
      savings: 'Save ₹500',
      description: 'Best value for long-term protection',
      features: [
        'Everything in 1 Year plan',
        'Dedicated account manager',
        'Premium support (24/7)',
        'Custom integrations',
        'Advanced threat intelligence',
        'White-label reporting',
        'Annual security audit'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Choose Your Protection Plan
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Secure your systems with enterprise-grade ransomware detection. Start with a free trial and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/50'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-semibold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400">
                      {plan.duration}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                      {plan.savings}
                    </div>
                  )}
                  <p className="text-slate-400 text-sm mt-3">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`mt-0.5 ${
                        plan.highlighted ? 'text-cyan-400' : 'text-slate-400'
                      }`}>
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.name === 'Free Trial' ? 'Start Free Trial' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <span>✓ No credit card required for trial</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Instant activation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
