<script lang="ts" setup>

onMounted(async () => {
  await nextTick();

  const about = document.querySelector('.about') as HTMLElement;
  const sidebar = document.querySelector('.sidebar') as HTMLElement;

  const updateSidebarPosition = () => {
    sidebar.style.left = `${about.getBoundingClientRect().right}px`;
  }

  window.addEventListener('scroll', updateSidebarPosition);
  window.addEventListener('resize', updateSidebarPosition);

  // 初始设置一次
  updateSidebarPosition();

})

const openInNewTab = (link: string) => {
  window.open(link, '_blank');
}


</script>
<template>
  <div class="about">
    <div class="title pb-4">
      About me
    </div>
    <div class="about-boby w-full flex-grow-1 px-16 py-8">
      <div class="introduce">
        <div class="p">
          <P class="en">My name in Chinese is Junfeng Huang, while in English it's Jory Joestar.</P>
          <P class="zh">我的中文名是黄俊丰，英文名是Jory Joestar。</P>
        </div>
        <div class="p">
          <p class="en">My network name is "RichWilds", commonly known as "Rwilds", with the Chinese name being "丰饶之野"
            and its abbreviation being "丰野".</p>
          <p class="zh">我的网络名称是丰饶之野，简称为丰野，而英文名称则为RichWilds,简称为Rwilds。</p>
        </div>
        <div class="p">
          <p class="en"> I was born in 2000 and it wasn't until university that I began exploring skills related to
            programming, product development, and design. I have had exposure to a wide range of areas. From junior high
            school through university, I acquired various skills including BeatBoxing, Breaking Dance, remixing music,
            and more.</p>
          <p class="zh">我出生于2000年，从大学开始才接触编程、产品和设计等方面技能，对于大多数事物我都有所接触，从初中到大学期间，学习了不少技能，如：BeatBox、Breaking Dance、混音编曲等等
          </p>
        </div>
        <div class="p">
          <P class="en">I work in the field of internet-related jobs as my main profession, and engage in
            self-media and product sales as side ventures. My lifelong dream has always been to create an innovative
            game that truly reflects my style.</P>
          <P class="zh">我的主业是从事互联网相关的工作，副业则是自媒体、商品销售，从小到大的梦想是做一款别具一格的游戏，属于我的游戏。</P>
        </div>
        <div class="p">
          <p class="en"> Until recently, I discovered that I don't just want to create my own game, but rather, I want
            to be more involved in expressing my true self. I aim to leave a unique mark in this brief lifetime.</p>
          <p class="zh">直到最近，我才发现我不仅仅是想创造一款我的游戏，而是我想参与更多一些表达自我的形象，我想要在这短短的一生中留下独特的脚印。</p>
        </div>
        <div class="p">
          <p class="en">Currently, I am actively studying AI-related knowledge and exploring various technical aspects
            of the industry, including AIGC applications. Additionally, I have numerous ideas for products and games. If
            you share a similar interest, please feel free to reach out to me.</p>
          <p class="zh">目前，我正在努力学习AI相关知识，也在接触一些行业知识、AIGC应用方面的技术，当然我也拥有很多产品想法和游戏想法，如果你也感兴趣，可以联系我。</p>
        </div>
        <div class="p">
          <p class="en">Finally, this blog is here to document and share some of my quirky ideas; it's also about
            creating a personal website that caters to both my mental and practical needs. I hope you enjoy it and stay
            happy every day.</p>
          <p class="zh">最后，这个博客用来记录和分享一些我的奇思妙想，也是创造自建网站用于满足自身精神和实际的需求。希望你喜欢，天天开心。</p>
        </div>
        <div class="p">
          <p class="en">Share with you a line from my favorite poem: "When life is sweet, seize the moment; do not let
            the golden goblet sit empty under the moonlight."</p>
          <p class="zh">分享一句我最喜欢的诗句：人生得意须尽欢，莫使金樽空对月。</p>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
.about {

  .title {
    color: var(--jory-color);
    font-size: 5rem;
    font-weight: bold;
    border-bottom: .25rem dashed var(--jory-color);
    opacity: .15;
    padding: 1rem;

  }

  .introduce {
    color: var(--jory-color);

    .p {
      margin: 1rem 0;

      p {
        margin: .25rem 0;
      }

      .en {
        font-weight: bold;
      }
    }


  }

}
</style>
