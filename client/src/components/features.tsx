export default function Features() {
  const features = [
    {
      title: "Homeowner Tools",
      description: "Plan projects, request bids, and hire with confidence.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Accelerated Growth",
      description: "Get in front of real homeowners—no paywall, no junk leads.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Find Helpers & Employees",
      description: "Post roles, meet reliable helpers, and build your crew faster.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Direct Connect",
      description: "Homeowners and contractors, connected directly—no middlemen.",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    }
  ];

  return (
    <section className="mt-8 w-full max-w-container mx-auto px-4" id="why">
      <h2 className="text-2xl font-black tracking-wide mb-6">Why TradeScout?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <article key={index} className="card-gradient border border-white/6 rounded-2xl shadow-2xl overflow-hidden">
            <div 
              className="h-44 relative bg-panel border-b border-white/6 bg-cover bg-center"
              style={{ backgroundImage: `url('${feature.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-black/15"></div>
            </div>
            <div className="p-4 pb-5">
              <h3 className="text-lg font-black mb-2">{feature.title}</h3>
              <p className="text-muted-text leading-relaxed m-0">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
