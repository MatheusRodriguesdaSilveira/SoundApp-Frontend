import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from "./components/header";
import { SideBarColumn } from "./components/sidebarColumn";
import { ForYouPage } from "./components/foryouPage";
import { FollowersPage } from "./components/followers";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <SideBarColumn />
      <div className="flex flex-col items-center justify-center mt-8">
        <Tabs defaultValue="forYou" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forYou">Para você</TabsTrigger>
            <TabsTrigger value="followers">Seguindo</TabsTrigger>
          </TabsList>
          <TabsContent value="forYou" className="w-full">
            <ForYouPage />
          </TabsContent>
          <TabsContent value="followers" className="w-full">
            <FollowersPage />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default HomePage;
