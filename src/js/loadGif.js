import '@babel/polyfill';
import 'whatwg-fetch';

const loadGifHandler = () => {
    const monoElement = document.getElementById('mono');
    const stereoElement = document.getElementById('stereo');
    const nulElement = document.getElementById('nul');
    const superElement = document.getElementById('super');

    if (!monoElement || !stereoElement || !nulElement || !superElement) return;
    const gifSizes = [
        'downsized_small',
        'downsized_medium',
        'downsized_large',
        'downsized',
    ];

    const tagsData = [
        {
            tag: 'boring',
            element: monoElement,
        },
        {
            tag: 'boom',
            element: stereoElement,
        },
        {
            tag: 'fail',
            element: nulElement,
        },
        {
            tag: 'amazing',
            element: superElement,
        },
    ];

    const getImageData = url =>
        fetch(url)
            .then(response => response.json())
            .then(response => {
                let urlValue = '';
                if (response.data && response.data.images) {
                    urlValue = response.data.images;
                }
                return urlValue;
            });

    const createSrcset = imageData => {
        let srcset = '';
        const { length } = gifSizes;
        gifSizes.forEach((size, index) => {
            if (imageData[size].url) {
                srcset += `${imageData[size].url} ${imageData[size].width}w`;
                if (index < length - 1) srcset += ',';
            }
        });
        return srcset;
    };

    const createSizes = imageData => {
        let sizes = '';
        const { length } = gifSizes;
        gifSizes.forEach((size, index) => {
            if (index < length - 1) {
                sizes += `(max-width: ${imageData[size].width}px) ${
                    imageData[size].width
                }px`;
                sizes += ',';
            } else {
                sizes += `${imageData[size].width}px`;
            }
        });
        return sizes;
    };

    const createImage = ({ imageData, element }) => {
        const { url } = imageData.downsized;

        const img = document.createElement('img');
        img.src = url;
        img.srcset = createSrcset(imageData);
        img.sizes = createSizes(imageData);
        element.appendChild(img);
    };

    const makeImage = () => {
        tagsData.forEach(async tagData => {
            const { tag, element } = tagData;
            const API_URL = `/gif-api/random?q=${tag}&api_key=q7TSsbKeyuScTAoDpnpdJUbGIhpIeO4o&limit=1`;
            const imageData = await getImageData(API_URL);
            createImage({ imageData, element });
        });
    };

    makeImage();
};

export default loadGifHandler;
