import Link from 'next/link';

export default function ProBottomBlock() {
  return (
    <section className="section pro-crosssell">
      <p>
        Vous êtes un pressing, un commerce ou un gérant de logements ? FIX intervient aussi auprès des
        professionnels, avec devis écrit et facture au nom de votre entreprise.{' '}
        <Link href="/professionnels" data-conversion="bottom-block-pro" data-ga-event="bottom_block_pro_click">
          Découvrir Fix Pro
        </Link>
      </p>
    </section>
  );
}
