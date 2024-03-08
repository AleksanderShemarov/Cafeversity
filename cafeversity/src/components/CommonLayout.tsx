import CommonHeader from "./CommonHeader";


export default function CommonLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <CommonHeader />
            <main>{children}</main>
        </>
    )
}
