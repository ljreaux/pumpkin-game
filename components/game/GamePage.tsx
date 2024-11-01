"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { MainMenu } from "./scenes/MainMenu";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useScore from "./useScore";
import { createScore } from "@/app/actions";
import { IRefPhaserGame } from "./PhaserGame";
import { toast } from "@/hooks/use-toast";

// ensures that phaser never loads on the server
const PhaserGame = dynamic(
  () => import("./PhaserGame").then((mod) => mod.PhaserGame),
  { ssr: false }
);

function GamePage() {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [showScoreForm, setShowScoreForm] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const score = useScore();

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setShowScoreForm(scene.scene.key === "GameOver");
    setPlayAgain(scene.scene.key === "GameOver");
    setButtonVisible(
      scene.scene.key === "MainMenu" || scene.scene.key === "GameOver"
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      <div className="flex gap-4 flex-col">
        {buttonVisible && (
          <Button onClick={changeScene}>
            {playAgain ? "Play Again" : "Start Game"}
          </Button>
        )}
        {showScoreForm && <ScoreForm score={score} />}
      </div>
    </div>
  );
}

export default GamePage;

const ScoreForm = ({ score }: { score: number }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formSchema = z.object({
    name: z.string().length(3, {
      message: "Username must be 3 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    if (hasSubmitted) return;
    try {
      const savedScore = await createScore(name, score, new Date());
      if (!savedScore) throw new Error();
      toast({
        description: `Thanks for playing ${savedScore.name}, press the button to play again.`,
      });
      setHasSubmitted(true);
      form.reset();
    } catch {
      toast({ description: "Something went wrong.", variant: "destructive" });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1>Submit your Score</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initials</FormLabel>
              <FormControl>
                <Input placeholder="INT" {...field} disabled={hasSubmitted} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={hasSubmitted}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
