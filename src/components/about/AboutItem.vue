<template>
  <div class="about-item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="about-details">
      <h2>
        <slot name="heading"></slot>
      </h2>
      <slot></slot>
      <div class="about-divider"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme' as *;

.about-item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.about-details {
  flex: 1;
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: $color-lilac-dark;

  > h2 {
    font-size: 1.4rem;
    font-weight: 500;
    color: $color-lilac-darker;
    text-align: left;
  }
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: $color-lilac-dark;
}

@media (min-width: 1024px) {
  .about-item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: 0.4rem;
    left: -26px;
    position: absolute;
    border: 1px solid $color-lilac-darker;
    background: $color-lilac-light;
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .about-item:before {
    content: ' ';
    border-left: 1px solid $color-lilac-dark;
    position: absolute;
    left: 0;
    top: 0;
    height: 0.4rem;
  }

  .about-item:after {
    content: ' ';
    border-left: 1px solid $color-lilac-dark;
    position: absolute;
    left: 0;
    top: calc(0.4rem + 50px);
    bottom: 0;
  }

  .about-item:first-of-type:before {
    display: none;
  }

  .about-item:last-of-type:after {
    display: none;
  }
}

.about-divider {
  display: flex;
  margin-top: 1.5rem;
  border: 1px solid $color-lilac-light;
}
</style>
