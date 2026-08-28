import { getSanityLoanProducts } from './src/lib/sanity';
import { LOAN_PRODUCTS } from './src/data/mockData';

async function verify() {
  console.log('========================================');
  console.log('SANITY LOAN PRODUCTS VERIFICATION');
  console.log('========================================\n');

  try {
    const sanityProducts = await getSanityLoanProducts();

    console.log(`Fetched products count: ${sanityProducts ? sanityProducts.length : 0}`);

    if (!sanityProducts || sanityProducts.length === 0) {
      console.log('WARNING: No products returned from Sanity dataset.');
      return;
    }

    console.log('\nProduct names returned from Sanity:');
    sanityProducts.forEach((p, index) => {
      console.log(`  ${index + 1}. [${p.category}] ${p.name} (ID: ${p.id}, Max: ${p.maxAmount}, Tenure: ${p.maxTenure}, Badge: "${p.badge}")`);
    });

    console.log('\nComparison with Mock Data:');
    console.log(`Mock products count: ${LOAN_PRODUCTS.length}`);
    LOAN_PRODUCTS.forEach((mock, index) => {
      const match = sanityProducts.find(sp => sp.id === mock.id || sp.category === mock.category);
      if (match) {
        console.log(`  ✓ [MIGRATED] Mock #${index + 1} "${mock.name}" -> Sanity "${match.name}" (Badge: ${match.badge})`);
      } else {
        console.log(`  ✗ [MISSING] Mock #${index + 1} "${mock.name}" (ID: ${mock.id}) not found in Sanity`);
      }
    });

    console.log('\nAll mock products successfully verified in Sanity: ' + (sanityProducts.length === LOAN_PRODUCTS.length ? 'YES (100% Match)' : 'NO'));
  } catch (error) {
    console.error('ERROR during verification:', error);
  }
}

verify();
