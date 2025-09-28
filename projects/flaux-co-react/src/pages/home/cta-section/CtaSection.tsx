import './CtaSection.scss'

export const CtaSection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  )
}