//layer1
//left eye
//right eye
//bottom left branch
//top left branch
//bottom right branch
//top right branch
//body
//spot1
//spot2
//spot3
//spot4
//spot5
//spot6
const fishColors = {
  layer: '#F5EF81',
  left_eye: '#0F0708',
  right_eye: '#0F0708',
  bottom_left_branch: '#E48125',
  top_left_branch: '#E48125',
  bottom_right_branch: '#E48125',
  top_right_branch: '#E48125',
  body: '#E58325',
  spot1: '#F2B92E',
  spot2: '#F2B92E',
  spot3: '#F2B92E',
  spot4: '#F2B92E',
  spot5: '#F2B92E',
  spot6: '#F2B92E',
};

const frames = [
  {
    layer:
      'M68.17 20.8578L66.7 11.7379L72.7 4.37785L83.61 8.99785C92.9353 4.2911 103.379 2.24947 113.79 3.09785C121.125 3.74075 128.261 5.82381 134.79 9.22784L144.28 1.79785L149.34 5.89784L145.05 17.9978C161.505 33.2767 171.325 54.3895 172.41 76.8179C184.29 78.6679 195.385 83.9044 204.365 91.8999C213.345 99.8955 219.829 110.311 223.04 121.898C215.642 123.444 207.961 122.921 200.84 120.388C184.39 114.438 177.79 99.6879 176.59 96.8779C175.375 125.198 171.171 153.311 164.05 180.748C168.974 186.961 172.657 194.064 174.9 201.668C176.061 205.654 176.812 209.749 177.14 213.888C176.14 214.208 168.24 216.498 161.58 211.698C159.134 209.913 157.225 207.492 156.06 204.698L104.5 275.388C105.21 276.568 116.39 296.028 105.94 316.388C102.51 323.039 97.3813 328.665 91.0744 332.694C84.7676 336.723 77.5072 339.012 70.03 339.328L81.61 303.618L48.69 318.618C48.4 315.428 47.38 300.538 57.92 287.948C67.54 276.458 83.14 271.238 98.62 274.088C93.9 251.161 89.1833 228.228 84.47 205.288C82.4611 207.023 80.314 208.592 78.05 209.978C72.6751 213.255 66.7374 215.503 60.54 216.608C61.2434 210.797 63.2951 205.231 66.5315 200.354C69.7678 195.477 74.0992 191.424 79.18 188.518C65.2801 160.751 54.9256 131.347 48.36 100.998C43.999 109.92 37.0551 117.324 28.4307 122.248C19.8063 127.172 9.9003 129.388 0 128.608C0.86 124.008 4.57 107.308 20 95.3578C27.4011 89.6692 36.1541 86.0026 45.4 84.7178C47.9699 61.9801 55.7555 40.1429 68.15 20.9079L68.17 20.8578Z',
    left_eye:
      'M57.63 48.6979C65.8149 48.6979 72.45 42.0627 72.45 33.8779C72.45 25.693 65.8149 19.0579 57.63 19.0579C49.4452 19.0579 42.8101 25.693 42.8101 33.8779C42.8101 42.0627 49.4452 48.6979 57.63 48.6979Z',
    right_eye:
      'M156.57 42.1278C164.755 42.1278 171.39 35.4926 171.39 27.3078C171.39 19.1229 164.755 12.4878 156.57 12.4878C148.385 12.4878 141.75 19.1229 141.75 27.3078C141.75 35.4926 148.385 42.1278 156.57 42.1278Z',
    bottom_left_branch: 'M82.0596 194.978L65.8696 208.368',
    top_left_branch: 'M18.9196 103.088L47.8496 86.6379L18.1396 123.318',
    bottom_right_branch: 'M158.99 194.128L168.74 207.198',
    top_right_branch: 'M202.24 97.2279L173.29 82.3079L206.13 115.978',
    body: 'M99.4096 281.608C107.14 272.478 117.59 259.458 128.89 243.068C141.73 224.458 152.97 208.148 161.89 187.688C168.52 172.548 188.08 122.758 174.51 66.7877C168.8 43.2177 160.51 32.0777 156.51 27.3077C151.17 20.8677 132.68 -1.38229 105.75 0.0677115C78.0896 1.55771 61.9596 26.9577 57.5696 33.8777C53.6596 40.0377 44.1496 56.8777 44.5696 88.1077C45.1796 138.268 70.4796 157.458 87.9796 218.618C93.8732 239.182 97.7021 260.283 99.4096 281.608Z',
    spot1:
      'M64.1997 96.4077C69.3897 107.408 81.2897 112.858 91.4797 109.828C99.2597 107.518 105.18 100.518 106.84 91.9277L64.1997 96.4077Z',
    spot2:
      'M84.6396 173.608C87.6396 179.958 94.4997 183.098 100.37 181.348C102.649 180.592 104.68 179.229 106.243 177.405C107.806 175.582 108.842 173.366 109.24 170.998L84.6396 173.608Z',
    spot3:
      'M108.66 158.928C110.8 163.478 115.72 165.718 119.93 164.468C121.557 163.926 123.006 162.952 124.122 161.65C125.239 160.349 125.981 158.768 126.27 157.078L108.66 158.928Z',
    spot4:
      'M109.65 204.808C111.79 209.358 116.71 211.598 120.92 210.348C122.542 209.809 123.987 208.841 125.103 207.547C126.219 206.253 126.965 204.681 127.26 202.998L109.65 204.808Z',
    spot5:
      'M125.04 115.468C128.93 123.738 137.87 127.818 145.52 125.538C151.36 123.808 155.81 118.538 157.06 112.098L125.04 115.468Z',
    spot6:
      'M105.78 81.4678C108.31 86.8278 114.11 89.4678 119.07 87.9978C120.992 87.363 122.705 86.2153 124.023 84.6786C125.341 83.142 126.215 81.2745 126.55 79.2778L105.78 81.4678Z',
  },
  {
    layer:
      'M68.1147 20.3833L66.6451 11.4545L72.6437 4.27248L83.6412 8.75149C91.5721 4.79129 100.36 2.7449 109.268 2.78396C118.177 2.82301 126.946 4.94636 134.84 8.97594L144.318 1.72559L149.377 5.72645L145.067 17.5436C161.519 32.453 171.337 53.0553 172.421 74.9414C184.299 76.7466 195.392 81.8565 204.37 89.6588C213.347 97.461 219.83 107.625 223.04 118.931C215.643 120.435 207.965 119.925 200.845 117.458C184.399 111.603 177.79 97.2584 176.6 94.5163C175.969 108.812 174.541 123.064 172.321 137.208C170.224 150.391 167.441 163.461 163.983 176.368C168.902 182.432 172.582 189.363 174.821 196.782C175.985 200.672 176.739 204.667 177.07 208.707C176.071 209.019 168.162 211.254 161.514 206.56C159.065 204.82 157.153 202.457 155.985 199.729C145.501 223.838 135.006 247.928 124.502 271.998C126.842 272.974 143.998 280.839 149.576 300.375C155.155 319.911 144.498 335.505 143.038 337.505C135.04 322.738 127.065 307.977 119.113 293.223L106.846 339.33C103.787 336.51 93.749 326.557 92.2893 310.904C89.9398 285.709 112.085 269.861 113.185 269.1L84.4211 200.295C77.613 206.016 69.3462 209.833 60.4964 211.341C61.2001 205.673 63.2505 200.242 66.4842 195.484C69.7178 190.725 74.0455 186.769 79.1223 183.931C65.2459 156.834 54.9075 128.145 48.3492 98.5367C43.9876 107.241 37.0446 114.464 28.4223 119.267C19.8 124.07 9.89698 126.231 0 125.469C0.859807 120.99 4.56898 104.694 19.9955 93.0331C27.3928 87.4917 36.1415 83.9267 45.3798 82.6894C47.9468 60.5024 55.7272 39.1934 68.1147 20.4223V20.3833Z',
    left_eye:
      'M57.5872 47.5402C65.7702 47.5402 72.4039 41.0656 72.4039 33.0786C72.4039 25.0917 65.7702 18.6169 57.5872 18.6169C49.4042 18.6169 42.7705 25.0917 42.7705 33.0786C42.7705 41.0656 49.4042 47.5402 57.5872 47.5402Z',
    right_eye:
      'M156.505 41.1389C164.688 41.1389 171.322 34.6642 171.322 26.6772C171.322 18.6903 164.688 12.2156 156.505 12.2156C148.322 12.2156 141.688 18.6903 141.688 26.6772C141.688 34.6642 148.322 41.1389 156.505 41.1389Z',
    bottom_left_branch: 'M82.0018 190.293L65.8154 203.359',
    top_left_branch: 'M18.886 100.625L47.7995 84.5627L18.0962 120.366',
    bottom_right_branch: 'M158.924 189.463L168.672 202.217',
    top_right_branch: 'M202.165 94.9066L173.221 80.3474L206.054 113.203',
    body: 'M119.813 281.913C124.023 273.13 130.021 260.279 136.87 244.636C150.147 214.327 156.785 199.183 161.864 183.16C168.922 160.901 182.609 116.15 170.162 64.5196C167.006 51.4599 162.427 38.7672 156.505 26.6578C151.285 18.0147 143.707 10.9567 134.617 6.27072C125.528 1.58474 115.283 -0.545091 105.026 0.118691C94.769 0.782472 84.9023 4.21377 76.5261 10.03C68.1498 15.8463 61.5933 23.819 57.5874 33.0591C51.2922 49.5371 47.9803 66.958 47.7996 84.5434C47.5697 125.333 64.9558 149.104 96.1988 222.612C106.616 247.154 114.535 267.724 119.813 281.913Z',
    spot1:
      'M64.1562 94.1063C69.3351 104.84 81.2424 110.159 91.4301 107.202C99.2084 104.948 105.117 98.1169 106.787 89.7346L64.1562 94.1063Z',
    spot2:
      'M84.5811 169.44C87.5804 175.636 94.4388 178.7 100.318 176.993C102.593 176.256 104.619 174.928 106.18 173.153C107.741 171.377 108.776 169.219 109.176 166.912L84.5811 169.44Z',
    spot3:
      'M108.606 155.115C110.745 159.545 115.664 161.741 119.863 160.521C121.492 159.994 122.944 159.045 124.062 157.774C125.18 156.504 125.924 154.961 126.212 153.31L108.606 155.115Z',
    spot4:
      'M109.596 199.885C111.735 204.316 116.654 206.511 120.853 205.291C122.482 204.765 123.933 203.815 125.052 202.545C126.17 201.274 126.913 199.731 127.202 198.08L109.596 199.885Z',
    spot5:
      'M124.972 112.696C128.871 120.766 137.809 124.757 145.458 122.532C151.296 120.834 155.735 115.702 156.995 109.417L124.972 112.696Z',
    spot6:
      'M105.726 79.5179C108.246 84.7581 114.044 87.3245 119.003 85.8998C120.925 85.2789 122.638 84.1588 123.957 82.6597C125.277 81.1605 126.153 79.339 126.491 77.3906L105.726 79.5179Z',
  },
  {
    layer:
      'M169.867 29.0193L172.627 20.3342L167.676 12.3384L156.029 15.2925C147.319 9.44393 137.119 6.03694 126.546 5.44544C119.071 5.06247 111.593 6.1166 104.54 8.54726L96.0582 0L90.4071 3.30862L93.0247 15.7061C74.3369 28.3513 61.4896 47.5925 57.2311 69.3135C45.034 69.4924 33.1487 73.08 22.9984 79.6466C12.8481 86.2132 4.86317 95.4805 0 106.339C7.21831 108.853 15.0094 109.394 22.5232 107.904C39.8822 104.359 48.6074 90.8786 50.2104 88.2987C47.4217 116.084 47.6734 144.078 50.9611 171.812C45.1424 177.197 40.4414 183.615 37.1125 190.718C35.3814 194.446 34.0487 198.336 33.1354 202.328C34.1499 202.781 41.7186 206.089 49.0842 202.328C51.7995 200.911 54.0628 198.8 55.6281 196.223L97.438 272.222C96.5654 273.276 82.5848 290.725 90.2042 312.044C92.7119 318.999 97.0709 325.187 102.839 329.979C108.607 334.772 115.578 337.998 123.045 339.33C120.84 327.185 118.642 315.041 116.451 302.896L147.415 321.989C148.156 318.927 151.28 304.54 142.464 290.813C134.429 278.298 119.484 271.07 103.535 271.73L127.459 206.582C129.234 208.546 131.172 210.367 133.252 212.027C138.189 215.955 143.834 218.96 149.901 220.889C150.015 215.123 148.738 209.411 146.171 204.21C143.604 199.009 139.819 194.462 135.119 190.935C152.982 165.76 167.522 138.511 178.4 109.824C181.518 119.115 187.442 127.281 195.403 133.264C203.363 139.246 212.992 142.768 223.04 143.373C222.817 138.775 221.457 121.976 207.649 108.209C201.015 101.651 192.74 96.8774 183.635 94.3546C184.253 71.8326 179.514 49.4755 169.786 29.0193H169.867Z',
    right_eye:
      'M178.612 57.7431C186.916 57.7431 193.648 51.2094 193.648 43.1498C193.648 35.0901 186.916 28.5564 178.612 28.5564C170.308 28.5564 163.577 35.0901 163.577 43.1498C163.577 51.2094 170.308 57.7431 178.612 57.7431Z',
    left_eye:
      'M80.1402 37.7831C88.4442 37.7831 95.176 31.2495 95.176 23.1898C95.176 15.1301 88.4442 8.59644 80.1402 8.59644C71.8362 8.59644 65.1045 15.1301 65.1045 23.1898C65.1045 31.2495 71.8362 37.7831 80.1402 37.7831Z',
    bottom_left_branch: 'M54.1569 185.539L42.5098 196.951',
    top_left_branch: 'M24.3802 85.1183L55.5677 74.5327L17.8262 102.873',
    bottom_right_branch: 'M131.334 196.902L145.711 212.185',
    top_right_branch: 'M207.74 115.949L180.997 95.9399L205.671 135.791',
    body: 'M101.638 279.007C95.1655 269.042 86.5012 254.911 77.4615 237.383C67.1942 217.473 58.1849 200.033 52.0976 178.852C47.5828 163.186 34.9516 111.951 56.4906 59.2301C65.5607 37.0349 75.4729 27.2961 80.1297 23.1899C86.4099 17.6558 108.121 -1.51639 134.977 3.58439C162.552 8.83288 175.163 35.804 178.603 43.1499C181.646 49.6982 188.85 67.4229 184.051 97.8208C176.36 146.652 148.227 161.906 122.011 219.147C113.192 238.395 106.368 258.447 101.638 279.007Z',
    spot1:
      'M163.182 103.237C156.425 113.261 143.692 116.934 133.881 112.581C126.394 109.263 121.443 101.631 120.976 93.0251L163.182 103.237Z',
    spot2:
      'M131.76 175.711C127.854 181.501 120.509 183.589 114.858 181.107C112.678 180.06 110.833 178.456 109.521 176.468C108.209 174.48 107.479 172.183 107.411 169.823L131.76 175.711Z',
    spot3:
      'M109.694 158.104C106.904 162.24 101.638 163.757 97.5901 161.965C96.0301 161.215 94.71 160.068 93.7715 158.645C92.8331 157.222 92.3118 155.579 92.2637 153.89L109.694 158.104Z',
    spot4:
      'M102.217 202.702C99.4267 206.847 94.1713 208.364 90.1232 206.562C88.5613 205.814 87.2391 204.667 86.2988 203.244C85.3585 201.822 84.8357 200.177 84.7866 198.487L102.217 202.702Z',
    spot5:
      'M99.3764 113.478C94.3036 121.011 84.7363 123.768 77.3706 120.498C71.75 118.007 68.0266 112.276 67.6816 105.807L99.3764 113.478Z',
    spot6:
      'M123.523 82.9615C120.225 87.8851 114.026 89.6378 109.248 87.5207C107.409 86.634 105.853 85.2785 104.747 83.5994C103.641 81.9204 103.026 79.981 102.968 77.9888L123.523 82.9615Z',
  },
  {
    layer:
      'M68.1147 20.3833L66.6451 11.4545L72.6437 4.27248L83.6412 8.75149C91.5721 4.79129 100.36 2.7449 109.268 2.78396C118.177 2.82301 126.946 4.94636 134.84 8.97594L144.318 1.72559L149.377 5.72645L145.067 17.5436C161.519 32.453 171.337 53.0553 172.421 74.9414C184.299 76.7466 195.392 81.8565 204.37 89.6588C213.347 97.461 219.83 107.625 223.04 118.931C215.643 120.435 207.965 119.925 200.845 117.458C184.399 111.603 177.79 97.2584 176.6 94.5163C175.969 108.812 174.541 123.064 172.321 137.208C170.224 150.391 167.441 163.461 163.983 176.368C168.902 182.432 172.582 189.363 174.821 196.782C175.985 200.672 176.739 204.667 177.07 208.707C176.071 209.019 168.162 211.254 161.514 206.56C159.065 204.82 157.153 202.457 155.985 199.729C145.501 223.838 135.006 247.928 124.502 271.998C126.842 272.974 143.998 280.839 149.576 300.375C155.155 319.911 144.498 335.505 143.038 337.505C135.04 322.738 127.065 307.977 119.113 293.223L106.846 339.33C103.787 336.51 93.749 326.557 92.2893 310.904C89.9398 285.709 112.085 269.861 113.185 269.1L84.4211 200.295C77.613 206.016 69.3462 209.833 60.4964 211.341C61.2001 205.673 63.2505 200.242 66.4842 195.484C69.7178 190.725 74.0455 186.769 79.1223 183.931C65.2459 156.834 54.9075 128.145 48.3492 98.5367C43.9876 107.241 37.0446 114.464 28.4223 119.267C19.8 124.07 9.89698 126.231 0 125.469C0.859807 120.99 4.56898 104.694 19.9955 93.0331C27.3928 87.4917 36.1415 83.9267 45.3798 82.6894C47.9468 60.5024 55.7272 39.1934 68.1147 20.4223V20.3833Z',
    left_eye:
      'M57.5872 47.5402C65.7702 47.5402 72.4039 41.0656 72.4039 33.0786C72.4039 25.0917 65.7702 18.6169 57.5872 18.6169C49.4042 18.6169 42.7705 25.0917 42.7705 33.0786C42.7705 41.0656 49.4042 47.5402 57.5872 47.5402Z',
    right_eye:
      'M156.505 41.1389C164.688 41.1389 171.322 34.6642 171.322 26.6772C171.322 18.6903 164.688 12.2156 156.505 12.2156C148.322 12.2156 141.688 18.6903 141.688 26.6772C141.688 34.6642 148.322 41.1389 156.505 41.1389Z',
    bottom_left_branch: 'M82.0018 190.293L65.8154 203.359',
    top_left_branch: 'M18.886 100.625L47.7995 84.5627L18.0962 120.366',
    bottom_right_branch: 'M158.924 189.463L168.672 202.217',
    top_right_branch: 'M202.165 94.9066L173.221 80.3474L206.054 113.203',
    body: 'M119.813 281.913C124.023 273.13 130.021 260.279 136.87 244.636C150.147 214.327 156.785 199.183 161.864 183.16C168.922 160.901 182.609 116.15 170.162 64.5196C167.006 51.4599 162.427 38.7672 156.505 26.6578C151.285 18.0147 143.707 10.9567 134.617 6.27072C125.528 1.58474 115.283 -0.545091 105.026 0.118691C94.769 0.782472 84.9023 4.21377 76.5261 10.03C68.1498 15.8463 61.5933 23.819 57.5874 33.0591C51.2922 49.5371 47.9803 66.958 47.7996 84.5434C47.5697 125.333 64.9558 149.104 96.1988 222.612C106.616 247.154 114.535 267.724 119.813 281.913Z',
    spot1:
      'M64.1562 94.1063C69.3351 104.84 81.2424 110.159 91.4301 107.202C99.2084 104.948 105.117 98.1169 106.787 89.7346L64.1562 94.1063Z',
    spot2:
      'M84.5811 169.44C87.5804 175.636 94.4388 178.7 100.318 176.993C102.593 176.256 104.619 174.928 106.18 173.153C107.741 171.377 108.776 169.219 109.176 166.912L84.5811 169.44Z',
    spot3:
      'M108.606 155.115C110.745 159.545 115.664 161.741 119.863 160.521C121.492 159.994 122.944 159.045 124.062 157.774C125.18 156.504 125.924 154.961 126.212 153.31L108.606 155.115Z',
    spot4:
      'M109.596 199.885C111.735 204.316 116.654 206.511 120.853 205.291C122.482 204.765 123.933 203.815 125.052 202.545C126.17 201.274 126.913 199.731 127.202 198.08L109.596 199.885Z',
    spot5:
      'M124.972 112.696C128.871 120.766 137.809 124.757 145.458 122.532C151.296 120.834 155.735 115.702 156.995 109.417L124.972 112.696Z',
    spot6:
      'M105.726 79.5179C108.246 84.7581 114.044 87.3245 119.003 85.8998C120.925 85.2789 122.638 84.1588 123.957 82.6597C125.277 81.1605 126.153 79.339 126.491 77.3906L105.726 79.5179Z',
  },
  {
    layer:
      'M68.17 20.8578L66.7 11.7379L72.7 4.37785L83.61 8.99785C92.9353 4.2911 103.379 2.24947 113.79 3.09785C121.125 3.74075 128.261 5.82381 134.79 9.22784L144.28 1.79785L149.34 5.89784L145.05 17.9978C161.505 33.2767 171.325 54.3895 172.41 76.8179C184.29 78.6679 195.385 83.9044 204.365 91.8999C213.345 99.8955 219.829 110.311 223.04 121.898C215.642 123.444 207.961 122.921 200.84 120.388C184.39 114.438 177.79 99.6879 176.59 96.8779C175.375 125.198 171.171 153.311 164.05 180.748C168.974 186.961 172.657 194.064 174.9 201.668C176.061 205.654 176.812 209.749 177.14 213.888C176.14 214.208 168.24 216.498 161.58 211.698C159.134 209.913 157.225 207.492 156.06 204.698L104.5 275.388C105.21 276.568 116.39 296.028 105.94 316.388C102.51 323.039 97.3813 328.665 91.0744 332.694C84.7676 336.723 77.5072 339.012 70.03 339.328L81.61 303.618L48.69 318.618C48.4 315.428 47.38 300.538 57.92 287.948C67.54 276.458 83.14 271.238 98.62 274.088C93.9 251.161 89.1833 228.228 84.47 205.288C82.4611 207.023 80.314 208.592 78.05 209.978C72.6751 213.255 66.7374 215.503 60.54 216.608C61.2434 210.797 63.2951 205.231 66.5315 200.354C69.7678 195.477 74.0992 191.424 79.18 188.518C65.2801 160.751 54.9256 131.347 48.36 100.998C43.999 109.92 37.0551 117.324 28.4307 122.248C19.8063 127.172 9.9003 129.388 0 128.608C0.86 124.008 4.57 107.308 20 95.3578C27.4011 89.6692 36.1541 86.0026 45.4 84.7178C47.9699 61.9801 55.7555 40.1429 68.15 20.9079L68.17 20.8578Z',
    left_eye:
      'M57.63 48.6979C65.8149 48.6979 72.45 42.0627 72.45 33.8779C72.45 25.693 65.8149 19.0579 57.63 19.0579C49.4452 19.0579 42.8101 25.693 42.8101 33.8779C42.8101 42.0627 49.4452 48.6979 57.63 48.6979Z',
    right_eye:
      'M156.57 42.1278C164.755 42.1278 171.39 35.4926 171.39 27.3078C171.39 19.1229 164.755 12.4878 156.57 12.4878C148.385 12.4878 141.75 19.1229 141.75 27.3078C141.75 35.4926 148.385 42.1278 156.57 42.1278Z',
    bottom_left_branch: 'M82.0596 194.978L65.8696 208.368',
    top_left_branch: 'M18.9196 103.088L47.8496 86.6379L18.1396 123.318',
    bottom_right_branch: 'M158.99 194.128L168.74 207.198',
    top_right_branch: 'M202.24 97.2279L173.29 82.3079L206.13 115.978',
    body: 'M99.4096 281.608C107.14 272.478 117.59 259.458 128.89 243.068C141.73 224.458 152.97 208.148 161.89 187.688C168.52 172.548 188.08 122.758 174.51 66.7877C168.8 43.2177 160.51 32.0777 156.51 27.3077C151.17 20.8677 132.68 -1.38229 105.75 0.0677115C78.0896 1.55771 61.9596 26.9577 57.5696 33.8777C53.6596 40.0377 44.1496 56.8777 44.5696 88.1077C45.1796 138.268 70.4796 157.458 87.9796 218.618C93.8732 239.182 97.7021 260.283 99.4096 281.608Z',
    spot1:
      'M64.1997 96.4077C69.3897 107.408 81.2897 112.858 91.4797 109.828C99.2597 107.518 105.18 100.518 106.84 91.9277L64.1997 96.4077Z',
    spot2:
      'M84.6396 173.608C87.6396 179.958 94.4997 183.098 100.37 181.348C102.649 180.592 104.68 179.229 106.243 177.405C107.806 175.582 108.842 173.366 109.24 170.998L84.6396 173.608Z',
    spot3:
      'M108.66 158.928C110.8 163.478 115.72 165.718 119.93 164.468C121.557 163.926 123.006 162.952 124.122 161.65C125.239 160.349 125.981 158.768 126.27 157.078L108.66 158.928Z',
    spot4:
      'M109.65 204.808C111.79 209.358 116.71 211.598 120.92 210.348C122.542 209.809 123.987 208.841 125.103 207.547C126.219 206.253 126.965 204.681 127.26 202.998L109.65 204.808Z',
    spot5:
      'M125.04 115.468C128.93 123.738 137.87 127.818 145.52 125.538C151.36 123.808 155.81 118.538 157.06 112.098L125.04 115.468Z',
    spot6:
      'M105.78 81.4678C108.31 86.8278 114.11 89.4678 119.07 87.9978C120.992 87.363 122.705 86.2153 124.023 84.6786C125.341 83.142 126.215 81.2745 126.55 79.2778L105.78 81.4678Z',
  },
];
export {fishColors, frames};