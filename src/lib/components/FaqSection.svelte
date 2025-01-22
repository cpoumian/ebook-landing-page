<script>
  import { faqs } from "$constants";
  import { FaqItem, Button } from "$components";
  import twitterIcon from "$assets/icons/twitter.webp";

  let questionCurrentlyExpanded = $state(-1);

  function onclick(index) {
    if (questionCurrentlyExpanded === index) {
      questionCurrentlyExpanded = -1;
      return;
    }
    questionCurrentlyExpanded = index;
  }
</script>

<section class="landing-page-section">
  <h2 class="mb-l">Frequently asked questions</h2>
  <div class="faq-container">
    {#each faqs as faq, index}
      <FaqItem {faq} isExpanded={index === questionCurrentlyExpanded} onclick={() => onclick(index)}/>
    {/each}
  </div>
  <div class="additional-info mt-m">
    <Button class="mt-s">BUY NOW</Button>
    <p class="mt-m">Any other questions?</p>
    <a href="https://twitter.com">
      <p>Hit me up on Twitter <img class="twitter-icon" src={twitterIcon} alt="twitter-icon" /></p>
    </a>
  </div>
</section>

<style>
  .additional-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: grey;
  }

  .twitter-icon {
    width: 16px;
    height: 16px;
  }

  .additional-info a {
    text-decoration: underline;
  }
</style>
