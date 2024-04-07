import React from "react";

const Rook = ({ isFilled = false }) => {
  return isFilled ? (
    <svg
      width="162"
      height="211"
      viewBox="0 0 162 211"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M155.333 187.923H152.284V169.605L137.606 153.168H137.457V56.2059H137.606L156.704 37.9391H156.825V6.68872C156.825 3.95742 154.705 1.74521 152.095 1.74521H125.674V18.7306L110.845 23.6432L97.181 18.7306V1.74521H64.6158V18.7306L50.9486 23.6432L36.1214 18.7306V1.74521H9.7052C7.0937 1.74521 4.97699 3.95732 4.97699 6.68872V37.9391H5.03082L24.1961 56.2059V153.168L9.51642 169.605V187.923H6.46399C3.73269 187.923 1.51904 190.138 1.51904 192.872V204.495C1.51904 207.223 3.73259 209.438 6.46399 209.438H155.328C158.062 209.438 160.274 207.223 160.274 204.495V192.872C160.274 190.167 158.059 187.933 155.325 187.933L155.333 187.923Z"
        fill="black"
        stroke="black"
        strokeWidth="2.684"
        strokeLinecap="square"
      />
      <path
        d="M14.354 187.923H146.361"
        stroke="white"
        strokeWidth="2.684"
        strokeLinecap="round"
      />
      <path
        d="M14.9359 169.613H145.782"
        stroke="white"
        strokeWidth="2.684"
        strokeLinecap="round"
      />
      <path
        d="M131.826 153.19H27.7311"
        stroke="white"
        strokeWidth="2.684"
        strokeLinecap="round"
      />
      <path
        d="M28.3101 56.2275H132.408"
        stroke="white"
        strokeWidth="2.684"
        strokeLinecap="round"
      />
      <path
        d="M11.4469 37.9488H152.757"
        stroke="white"
        strokeWidth="2.684"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="163"
      height="212"
      viewBox="0 0 163 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M156.21 210.193C158.945 210.193 161.155 207.981 161.155 205.246V193.624C161.155 190.889 158.945 188.679 156.21 188.679H7.34344C4.61064 188.679 2.39844 190.889 2.39844 193.624V205.246C2.39844 207.981 4.61044 210.193 7.34344 210.193H156.21Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
      />
      <path
        d="M153.162 170.363H10.3953V188.683H153.162V170.363Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
      />
      <path
        d="M153.162 170.363L138.482 153.909H25.0749L10.3953 170.363H153.162Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
        strokeLinejoin="bevel"
      />
      <path
        d="M157.635 38.6336L138.482 56.9564H25.0748L5.85864 38.6336H157.635Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
        strokeLinejoin="round"
      />
      <path
        d="M138.331 56.9564H25.075V153.919H138.331V56.9564Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
      />
      <path
        d="M152.97 2.49129H126.554V19.4783L111.73 24.3881L98.0608 19.4783V2.49129H65.4988V19.4783L51.83 24.3881L37.0044 19.4783V2.49129H10.5882C7.9767 2.49129 5.85986 4.70339 5.85986 7.43319V38.6868H157.703V7.43319C157.7 4.70239 155.582 2.49069 152.971 2.49069L152.97 2.49129Z"
        fill="white"
        stroke="#20201E"
        strokeWidth="3.4947"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default Rook;
