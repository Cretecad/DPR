import FadeUp from "@/components/ui/FadeUp";

export default function ConsultationSection() {
  return (
    <section className="dpr-consultation" id="consultation">
      <FadeUp>
        <div className="dpr-consultation-panel">
          <div className="dpr-consultation-copy">
            <p>Private Consultation</p>

            <h2>Start with clarity before you choose a property.</h2>

            <span>
              Tell us what you want to build, protect, or invest in. Destiny
              Point Realty will help you approach the next decision with a
              structured path.
            </span>
          </div>

          <form className="dpr-consultation-form">
            <label>
              Full name
              <input type="text" placeholder="Your name" />
            </label>

            <label>
              Interest
              <select defaultValue="">
                <option value="" disabled>
                  Select property interest
                </option>
                <option>Land banking</option>
                <option>Residential home</option>
                <option>Investment property</option>
                <option>Commercial property</option>
                <option>Property verification</option>
              </select>
            </label>

            <label>
              Phone or email
              <input type="text" placeholder="How should we reach you?" />
            </label>

            <button type="button">Request Consultation</button>
          </form>
        </div>
      </FadeUp>
    </section>
  );
}