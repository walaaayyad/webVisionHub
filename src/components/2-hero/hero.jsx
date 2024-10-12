import React from 'react'
import "./hero.css";

const hero = ({arLanguage})=> {
  return (
    <section id='hero' className='hero'>
      <div className="hero_container flex">
        {arLanguage ?
        <div className="ar-content" style={{direction: "rtl"}}>
          <h1>بوابة مشاريع الويب</h1>
          <p className='small-title'>ابدأ رحلتك نحو الإبداع والتميز في عالم تطوير الويب</p>
          <p>استمتع باكتشاف أكثر من ٩٠ مشروعاً شاملاً ومبتكراً على يوتيوب، مصممة خصيصاً لمطوري الويب. هذه المشاريع ليست مجرد مقاطع فيديو، بل هي فرص حقيقية لتطوير مهاراتك واكتساب خبرة عملية قيمة.</p>
        </div>
        :
        <div>
          <h1>WebVision Hub</h1>
          <p className='small-title'>Start your journey toward creativity and excellence</p>
          <p>Dive into a collection of over 90 comprehensive and innovative projects on YouTube, Specifically designed for web developers. These aren’t just videos, They’re real opportunities to enhance your skills and gain valuable hands-on experience.</p>
        </div>
      }
        
        
      <div className="img">
        <span className='purple-squar'></span>
        <img src="./images/webPages.png" alt="webPages"/>
      </div>
      </div>
    </section>
  )
}

export default hero