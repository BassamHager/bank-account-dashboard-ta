/* 
Purpose: returning an object of two properties {width, height} that help for styling by reflecting the current size of the document according to the displaying screen
Responsibility: Bassam hager
*/
import { computed, ref, onMounted, onUnmounted } from "vue";

interface IClient {
  clientWidth: number;
  clientHeight: number;
}

interface UseResizeType {
  doc: HTMLElement | IClient;
}

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
