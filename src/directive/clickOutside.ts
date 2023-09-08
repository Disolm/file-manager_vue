export const clickOutside = {
    beforeMount (el: any, binding: any) {
        el.clickOutsideEvent = (event: any) => {
            event.stopPropagation()
            // here I check that click was outside the el and his children
            if (!(el === event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    beforeUnmount(el: any){
        document.removeEventListener("click", el.clickOutsideEvent);
    }

}