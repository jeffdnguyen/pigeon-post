<template>
  <div>
    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div class="lax block" style data-lax-preset="spin"></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: -50pt; margin-left: -50pt; width: 40pt; height: 40pt;"
        data-lax-preset="spinRev-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: -90pt; margin-left: -0pt;"
        data-lax-preset="spin-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: 70pt; margin-left: -150pt; width: 40pt; height: 40pt;"
        data-lax-preset="spinRev-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: 100pt; margin-left: -60pt; width: 25pt; height: 25pt;"
        data-lax-preset="spin-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div class="lax block" style="margin-top: -30pt; margin-left: -70pt;" data-lax-preset="spin"></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: -70pt; margin-left: -20pt; width: 40pt; height: 40pt;"
        data-lax-preset="spinRev-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: -50pt; margin-left: -50pt; width: 25pt; height: 25pt;"
        data-lax-preset="spin-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: 30pt; margin-left: -20pt;"
        data-lax-preset="spinRev-500"
      ></div>
    </div>

    <div class="lax blockContainer" data-lax-preset="lazy fadeIn">
      <div
        class="lax block"
        style="margin-top: 80pt; margin-left: -10pt;"
        data-lax-preset="spin-500"
      ></div>
    </div>
  </div>
</template>

<script>
import lax from "lax.js";

export default {
  mounted: function() {
    lax.addElement(this.$el);
    this.$el.childNodes.forEach(element => {
      lax.addElement(element);
      lax.addElement(element.firstChild);
    });
  }
};
</script>

<style>
.block {
  background-image: url("../assets/orange_feather.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  width: 60pt;
  height: 60pt;
}
</style>