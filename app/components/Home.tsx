import React, { useContext, useState } from 'react';
import SettingsContext from '../context/SettingsContext';
import styles from './Home.css';
import * as sdk from './sdkUtils';

export default function Home(): JSX.Element {
  const [body, setBody] = useState('');
  const context: any = useContext(SettingsContext);

  const format = () => {
    const formatted = [
      'fixSalutations',
      'fixQuotes',
      'condenseMultilines',
      'reduceSpaces',
      'singleToDoubleQuotes',
    ].reduce((result, key) => {
      return context[key] ? sdk[key](result) : result;
    }, sdk.applyRules(context.applyRules ? context.shortcuts : {}, body));

    if (body !== formatted.trim()) {
      setBody(formatted.trim());
    }
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  return (
    <div className={styles.container} data-tid="container">
      <textarea onChange={onTextChanged} value={body} />
      <button type="button" onClick={format}>
        Format
      </button>
    </div>
  );
}
