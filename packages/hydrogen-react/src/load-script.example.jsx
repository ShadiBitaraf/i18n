import React, {useEffect} from 'react';
import {useLoadScript} from '@shopify/hydrogen-react';
import {useTranslation} from 'react-i18next';

export default function Homepage() {
  const scriptStatus = useLoadScript('https://some-cdn.com/some-script.js');
  const {t} = useTranslation();

  useEffect(() => {
    if (scriptStatus === 'done') {
      // do something
    }
  }, [scriptStatus]);

  return (
    <div>
      {scriptStatus === 'done' && (
        <p>{t('hydrogenReact.loadScript.loadedMessage')}</p>
      )}
    </div>
  );
}
