// import React from 'react'

import FaqItem from "./FaqItem"
import { faqs } from "../../assets/data/faqs"

const FaqList = () => {
  return (
    <ul className="mt-[36px]">
        {faqs.map((faq, index) => {
            return (
                <FaqItem item={faq} key={index} />
            )
        })}
    </ul>
  )
}

export default FaqList