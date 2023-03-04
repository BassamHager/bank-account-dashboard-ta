/* 
Purpose: returning the value of the scroll coordinates for the sake of darkening the background of the AppHeader when scrolling Y down.
Responsibility: Bassam hager
*/
import { computed, ref, onMounted, onUnmounted } from "vue";

export const useScroll = () => {
  // data
  const scrollData = ref({
    yData: window.scrollY,
  });

  // methods
  const getScrollData = () => {
    scrollData.value.yData = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener("scroll", getScrollData);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", getScrollData);
  });

  const scrollingData = computed(() => {
    getScrollData();
    return scrollData.value;
  });

  return { yValue: scrollingData.value.yData, updateY: getScrollData };
};
