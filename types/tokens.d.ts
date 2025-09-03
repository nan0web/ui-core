export namespace tokens {
    export namespace space {
        let xs: string;
        let sm: string;
        let md: string;
        let lg: string;
        let xl: string;
    }
    export namespace radius {
        export let none: string;
        let sm_1: string;
        export { sm_1 as sm };
        let md_1: string;
        export { md_1 as md };
        let lg_1: string;
        export { lg_1 as lg };
        export let full: string;
    }
    export namespace border {
        namespace width {
            let sm_2: string;
            export { sm_2 as sm };
            let md_2: string;
            export { md_2 as md };
        }
        namespace color {
            let _default: string;
            export { _default as default };
            export let muted: string;
            export let error: string;
        }
    }
    export namespace color_1 {
        export let text: string;
        export let background: string;
        export let primary: string;
        export let success: string;
        export let warning: string;
        let error_1: string;
        export { error_1 as error };
    }
    export { color_1 as color };
    export namespace font {
        let family: string;
        namespace size {
            let xs_1: string;
            export { xs_1 as xs };
            let sm_3: string;
            export { sm_3 as sm };
            export let base: string;
            let lg_2: string;
            export { lg_2 as lg };
            let xl_1: string;
            export { xl_1 as xl };
        }
        namespace weight {
            let normal: string;
            let medium: string;
            let bold: string;
        }
    }
    export namespace shadow {
        let sm_4: string;
        export { sm_4 as sm };
        let md_3: string;
        export { md_3 as md };
        let lg_3: string;
        export { lg_3 as lg };
    }
}
