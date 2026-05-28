import NewPropertyForm from "@/components/admin/NewPropertyForm";

export default function NewPropertyPage() {
  return (
    <main>
      <section className="dpr-admin-header">
        <div>
          <p>Property Desk</p>
          <h1>Add Property</h1>
          <span>
            Create a new property opportunity with image, title, location,
            pricing, purpose, status, and publication settings.
          </span>
        </div>
      </section>

      <NewPropertyForm />
    </main>
  );
}