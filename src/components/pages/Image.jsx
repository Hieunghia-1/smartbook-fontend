import React, { useState, useEffect } from 'react';

const Image = ({ bookId, name }) => {

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Dynamic import
        import(`../../resources/img/${bookId}.jpg`)
            .then(image => setImageSrc(image.default))
            .catch(() => setImageSrc('../../resources/img/logo.png'));
    }, [bookId]);

    return (
        <img src={imageSrc} alt={name} />
    );
};

export default Image;