import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { i18n, t } = useTranslation();

  const handleChange = async (): Promise<void> => {
    await i18n.changeLanguage('id');
  };

  useEffect(() => {
    handleChange();
  }, [])

  return (
    <>
      <main>
        {t('Home')}
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <>
    {page}
  </>
);

export default Home;