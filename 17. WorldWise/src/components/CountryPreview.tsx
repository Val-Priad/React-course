import styles from "./styles/CountryPreview.module.css";

function CountryPreview({
  country,
}: {
  country: { country: string; emoji: string };
}) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryPreview;
