// Uses the same styles as Product
import NavigationBar from "../components/NavigationBar";
import styles from "./styles/ProductPage.module.css";

export default function PricingPage() {
  return (
    <main className={styles.product}>
      <NavigationBar />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
