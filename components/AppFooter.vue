<script setup lang="ts">
</script>
<template>
  <footer class="footer">
    <div class="container">
      <p>Is there a project?</p>
        <div class="footer__content">
        <div class="footer__content__left">
          <h2>Let’s work together</h2>
        </div>
        <div class="footer__content__right">
          <div class="footer__content__item">
            <p>For all questions</p>
            <a href="tel:+79202780068">+7 (920) 278—00—68</a>
            <a href="mailto:qtim@agency.com">qtim@agency.com</a>
          </div>
          <div class="footer__content__item">
            <p>Office in Russia</p>
            <p>139 Ruben Station Lake Drew, NM 52678</p>
          </div>
          <div class="footer__content__item">
            <p>Office in Dubai</p>
            <p>139 Ruben Station Lake Drew, NM 52678</p>
          </div>
        </div>
        <div class="footer__content__bottom">
          <div class="footer__social">
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Telegram</a></li>
            </ul>
            <ul>
              <li><a href="#">Behance</a></li>
              <li><a href="#">Linkedn</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>
<style lang="scss" scoped>
.footer {
  padding: 140px 0 30px;
  background-color: $color-lavender;

  &__content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 56px;
    gap: 140px 368px;

    &__left, &__right {
      //width: 50%;
    }

    &__left {
      & > h2 {
        max-width: 464px;
        font-weight: 400;
        font-size: 112px;
        line-height: 100%;
        text-decoration: underline solid 1px;
      }
    }

    &__right {
      max-width: 160px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    &__bottom {
      width: 100%;
    }

    &__item {
      display: flex;
      flex-direction: column;

      & a:not(:nth-last-child(1)) {
        display: block;
        margin-bottom: 4px;
      }

      & > p:nth-child(1) {
        margin-bottom: 12px;
      }
    }
  }

  &__social {
    display: flex;
    justify-content: space-between;

    & ul {
      display: flex;
      align-items: center;
      gap: 32px;

      & a {
        text-decoration: underline solid 1px;
      }
    }
  }
}
</style>