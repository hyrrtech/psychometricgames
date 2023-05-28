import * as React from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';
const TrainHorizontalSvg = ({height, width, color, styles}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 230 148"
    fill="none"
    style={styles}>
    <Path
      d="M147.278 13.6629L147.278 13.6627L150.033 4.29471L150.561 2.5H152.432H187.541H222.65H225.497L225.129 5.3238L224.639 9.0738L224.639 9.07419C224.599 9.38183 224.572 10.1841 224.594 11.5304C224.615 12.8171 224.677 14.46 224.775 16.3505C224.97 20.1292 225.308 24.8425 225.74 29.5706L223.25 29.798L225.74 29.5706C227.918 53.4255 227.766 70.2711 225.127 99.475L222.89 124.225L222.684 126.5H220.4H212.816H207.097L206.431 128.732C206.431 128.732 206.431 128.732 206.431 128.732C205.578 131.591 203.893 134.444 201.852 136.855C199.814 139.263 197.293 141.38 194.638 142.646C194.638 142.646 194.638 142.646 194.637 142.646L193.562 140.389C188.851 142.635 172.213 142.631 167.783 140.383C161.398 137.142 157.131 131.602 157.131 126.55C157.131 124.497 156.646 124 154.642 124C152.972 124 152.153 124.554 152.153 125.684C152.153 129.528 147.926 135.974 143.456 138.948L147.278 13.6629ZM147.278 13.6629L145.05 21.2422M147.278 13.6629L145.05 21.2422M23.6146 19.793C24.6521 13.4411 28.3475 8.22353 33.9074 5.6893L23.6146 19.793ZM23.6146 19.793C23.5135 20.4108 23.4091 20.8646 23.3043 21.199C23.2157 21.4817 23.1399 21.6361 23.0958 21.7112C23.0786 21.7146 23.0576 21.7183 23.0323 21.722L23.0314 21.7221C22.2322 21.8386 21.5221 22.2143 21.0189 22.5289C20.4645 22.8756 19.9044 23.3135 19.3699 23.7893C18.3002 24.7414 17.1855 25.9766 16.2491 27.2906L23.6146 19.793ZM145.05 21.2422L103.868 21.402L63.0188 21.5605L62.7491 19.5401C60.9961 6.41244 46.3346 0.0231609 33.9078 5.68914L145.05 21.2422ZM101.826 125.779C101.827 125.778 101.828 125.781 101.829 125.787C101.827 125.781 101.826 125.779 101.826 125.779ZM13.9361 30.0498C13.8892 30.0882 13.766 30.1891 12.785 30.0202L16.2487 27.2911C14.8774 29.2142 14.2973 29.8202 13.9472 30.0415C13.9437 30.0436 13.9402 30.0465 13.9361 30.0498ZM23.1596 21.6947C23.1596 21.6947 23.1589 21.695 23.1574 21.6955C23.1589 21.6949 23.1596 21.6946 23.1596 21.6947Z"
      fill="white"
      stroke="white"
      strokeWidth={5}
    />
    <Path
      d="M76.23 140.46C88.7558 140.46 98.91 132.397 98.91 122.45C98.91 112.503 88.7558 104.44 76.23 104.44C63.7042 104.44 53.55 112.503 53.55 122.45C53.55 132.397 63.7042 140.46 76.23 140.46Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M127.97 142C140.496 142 150.65 133.937 150.65 123.99C150.65 114.043 140.496 105.98 127.97 105.98C115.444 105.98 105.29 114.043 105.29 123.99C105.29 133.937 115.444 142 127.97 142Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M180.65 142C193.176 142 203.33 133.937 203.33 123.99C203.33 114.043 193.176 105.98 180.65 105.98C168.124 105.98 157.97 114.043 157.97 123.99C157.97 133.937 168.124 142 180.65 142Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M219.4 119.32L224.83 62.39L220.03 7.97L213.96 62.39L219.4 119.32Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M21.66 25.59C14.0947 33.6681 9.59817 44.1411 8.95147 55.1897C8.30478 66.2383 11.5488 77.1644 18.12 86.07H71.24L73.4 81.81L148.29 81.1V25.59H21.66Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M27.33 86V98.24L68 97.11C68.9286 97.11 69.8388 96.8514 70.6287 96.3633C71.4185 95.8751 72.0569 95.1766 72.4721 94.3461C72.8874 93.5155 73.0632 92.5858 72.9798 91.661C72.8964 90.7362 72.5571 89.8528 72 89.11L148.31 87.97V80.1L72.96 81.72L71.26 85.07L27.33 86Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M23.31 119.32L31.35 104.91L27.33 98.25L26.62 86.01H21.48L23.31 119.32Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M152.78 105.85L148.29 87.94L72 89.08C73.37 91.66 72.87 93.34 72.71 93.81C71.62 96.88 66.61 98.9 60.58 97.32L28.75 98.21L31.37 104.91L152.78 105.85Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M144.71 67.58L152.78 105.85L31.35 104.91L23.08 120.74H53.87C56.14 114.25 59.79 111.31 61.59 110.11C72.44 102.85 90.22 109.11 97.02 119.56C97.6087 120.462 98.1269 121.408 98.57 122.39H106.35C106.74 121.48 112 109.85 124.19 107.74C134.58 105.95 145.51 111.84 150.5 122.39H159.55C160.01 121.11 164.11 110.47 174.55 107.51C184.99 104.55 197.33 110.51 203.02 122.39H219.4L214 61.52L144.71 67.58Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M76 138.69C86.8303 138.69 95.61 133.456 95.61 127C95.61 120.544 86.8303 115.31 76 115.31C65.1697 115.31 56.39 120.544 56.39 127C56.39 133.456 65.1697 138.69 76 138.69Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M127.73 140.11C138.56 140.11 147.34 134.876 147.34 128.42C147.34 121.964 138.56 116.73 127.73 116.73C116.9 116.73 108.12 121.964 108.12 128.42C108.12 134.876 116.9 140.11 127.73 140.11Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M180.42 140.11C191.25 140.11 200.03 134.876 200.03 128.42C200.03 121.964 191.25 116.73 180.42 116.73C169.59 116.73 160.81 121.964 160.81 128.42C160.81 134.876 169.59 140.11 180.42 140.11Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M32.06 112.47V99.88L52.14 101.13C53.5056 101.31 54.7616 101.973 55.68 103C56.2656 103.747 56.6691 104.621 56.8583 105.551C57.0475 106.482 57.0173 107.443 56.77 108.36C56.9645 109.047 57.0097 109.767 56.9028 110.472C56.7959 111.178 56.5392 111.852 56.15 112.45C55.6904 113.087 55.0908 113.61 54.3974 113.98C53.704 114.349 52.9352 114.554 52.15 114.58L32.06 112.47Z"
      fill="#1A130F"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M171.2 94H204.06L201.92 76.76C195.936 72.9914 188.866 71.3269 181.83 72.03C177.112 72.568 172.581 74.1866 168.59 76.76L171.2 94Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M38.67 35.45C38.7472 36.6783 39.1068 37.8723 39.7208 38.939C40.3348 40.0056 41.1866 40.9163 42.21 41.6C43.5665 42.3883 45.1412 42.718 46.7 42.54C47.8314 42.7881 49.002 42.798 50.1375 42.5693C51.2729 42.3405 52.3483 41.8781 53.2954 41.2113C54.2425 40.5445 55.0405 39.6879 55.6386 38.6961C56.2368 37.7042 56.6221 36.5988 56.77 35.45L55.21 31.45L38.67 35.45Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M88.25 37L107.42 31.45L108.88 37C107.693 38.6798 106.24 40.1557 104.58 41.37C103.056 42.4868 101.37 43.3636 99.58 43.97C99.14 44.07 94.32 45.11 90.84 41.84C89.4996 40.5313 88.5952 38.8413 88.25 37Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M120.17 35.45L138.6 29.08L140.91 35.45C140.194 37.5065 138.898 39.3123 137.18 40.65C136.054 41.5184 134.77 42.1602 133.4 42.54C132.121 43.0622 130.774 43.3989 129.4 43.54C127.1 43.7241 124.788 43.3821 122.64 42.54L120.17 35.45Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M97.7559 37.7812C103.424 36.9624 107.655 33.7728 107.204 30.6572C106.754 27.5415 101.794 25.6795 96.126 26.4984C90.4577 27.3172 86.2274 30.5068 86.6775 33.6224C87.1276 36.7381 92.0876 38.6001 97.7559 37.7812Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M128.352 36.0024C134.022 35.2006 138.262 32.0241 137.821 28.9076C137.38 25.7911 132.426 23.9146 126.756 24.7164C121.087 25.5182 116.847 28.6947 117.288 31.8112C117.729 34.9277 122.683 36.8042 128.352 36.0024Z"
      fill="black"
      stroke="black"
      strokeWidth={1.9997}
      strokeMiterlimit={10}
    />
    <Path
      d="M10.09 46.09C8.9235 45.579 7.9144 44.7661 7.16675 43.7351C6.4191 42.7041 5.95996 41.4924 5.83667 40.2249C5.71338 38.9573 5.93041 37.6798 6.46536 36.5241C7.00032 35.3684 7.83384 34.3762 8.88001 33.65L14.65 34.41L23.08 35.1L12.6 38.66C11.76 41.14 10.92 43.61 10.09 46.09Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M43.2107 36.4025C51.9778 36.012 58.7949 29.1832 58.4371 21.1499C58.0794 13.1166 50.6822 6.92085 41.9151 7.3113C33.148 7.70175 26.3308 14.5305 26.6886 22.5638C27.0464 30.5971 34.4435 36.7929 43.2107 36.4025Z"
      fill="black"
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M154.19 5H221.43C216.384 25.4622 214.346 46.5503 215.38 67.6H143.26C143.082 46.2436 146.785 25.0324 154.19 5Z"
      fill={color}
      stroke="black"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default TrainHorizontalSvg;