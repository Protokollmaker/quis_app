
export async function load({ params }: any) {
    const Layout: string = params.Layout;
    const solution = params.solution;
    return {
        data: {
            Layout,
            showSolustion: (solution === 'true'),
        }
    };
}