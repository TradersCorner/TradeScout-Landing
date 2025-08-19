export default function Reviews() {
  const reviews = [
    {
      text: "TradeScout made it simple to post my project and hire fast. Zero spam — just real pros.",
      author: "Real Homeowner From The Future"
    },
    {
      text: "I connected with real homeowners directly and booked work without buying leads. Finally.",
      author: "Real Contractor From The Future"
    }
  ];

  return (
    <section className="pt-10 pb-3 w-full max-w-container mx-auto px-4">
      <h2 className="text-2xl font-black tracking-wide mb-4">What People Are Saying</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto text-center">
        {reviews.map((review, index) => (
          <blockquote key={index} className="m-0">
            <p className="text-lg italic leading-relaxed text-gray-100 mb-2">
              "{review.text}"
            </p>
            <p className="font-extrabold text-brand m-0">— {review.author}</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
