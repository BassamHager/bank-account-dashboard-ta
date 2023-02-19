/* 
Purpose: returning an object of two properties {width, height} that help for styling by reflecting the current size of the document 
Responsibility: Bassam hager
*/
import { computed, ref, onMounted, onUnmounted, watch } from "vue";

type UseResizeType = {
  doc: HTMLElement | { clientWidth: number; clientHeight: number };
};

export const useResize = ({
  doc = document.documentElement,
}: UseResizeType) => {
  // data
  const sizeData = ref({
    width: doc.clientWidth,
    height: doc.clientHeight,
  });

  // methods
  const getDimensions = () => {
    sizeData.value.width = doc.clientWidth;
    sizeData.value.height = doc.clientHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", getDimensions);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", getDimensions);
  });

  const resizingData = computed(() => {
    getDimensions();
    return sizeData.value;
  });

  return resizingData.value;
};
