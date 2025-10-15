import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for react-router / whatwg streams in JSDOM
import { TextEncoder, TextDecoder } from 'node:util';
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;