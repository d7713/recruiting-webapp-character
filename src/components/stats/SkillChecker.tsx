import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import { SKILL_LIST, type Skill } from "@/const";

interface SkillCheckerResults {
  skill: string;
  dc: number;
}

interface SkillCheckerProps {
  onRoll: (result: SkillCheckerResults) => void;
}

function SkillChecker({ onRoll }: SkillCheckerProps) {
  const FormSchema = z.object({
    skill: z.string({
      required_error: "Select a skill.",
    }),
    dc: z.preprocess(
      (val) => parseInt(z.string().parse(val), 10),
      z
        .number({
          required_error: "DC is empty.",
        })
        .gt(0, {
          message: "DC must be greater or equal to zero.",
        })
        .lt(30, {
          message: "DC must be lesser or equal to 30.",
        })
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onRoll({ skill: data.skill, dc: data.dc });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center justify-center gap-x-6"
      >
        <FormField
          control={form.control}
          name="skill"
          render={({
            field,
          }: {
            field: ControllerRenderProps<z.infer<typeof FormSchema>, "skill">;
          }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Skill</SelectLabel>
                    {SKILL_LIST.map((skill: Skill) => (
                      <SelectItem key={skill.name} value={skill.name}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dc"
          render={({
            field,
          }: {
            field: ControllerRenderProps<z.infer<typeof FormSchema>, "dc">;
          }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="DC"
                  className="w-36"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Roll</Button>
      </form>
    </Form>
  );
}

export default SkillChecker;
