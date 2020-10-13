import React, { useRef, useEffect } from 'react';
import * as typeformEmbed from '@typeform/embed';

const typeformOptions = {
  hideFooter: false,
  hideHeaders: false,
  opacity: 0,
};

const FeedbackForm: React.FC<{ typeformUrl: string }> = ({ typeformUrl }) => {
  const typeformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeformRef && typeformRef.current) {
      typeformEmbed.makeWidget(
        typeformRef.current,
        typeformUrl,
        typeformOptions,
      );
    }
  }, [typeformRef, typeformUrl]);

  return <div ref={typeformRef} style={{ height: '100vh', width: '100%' }} />;
};

export default FeedbackForm;
