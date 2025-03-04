import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UserProfile } from "@/types/commons";

const FormSchema = z.object({
  featureSummary: z.string().min(15, {
    message: "Feature Summary should be more descriptive.",
  }),
  featureDescription: z
    .string()
    .min(15, {
      message: "Feature Description should be more verbose.",
    })
    .max(150, {
      message: "Feature Description should be more succint.",
    }),
  requestingEmployee: z.string({
    required_error: "Please select an employee to blame.",
  }),
  requestPriority: z.string({
    required_error: "Please select the priority for this feature request.",
  }),
});

export default function FeatureForm({
  employees,
  formSubmitCb,
}: {
  employees: UserProfile[];
  formSubmitCb: (data: object) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      featureSummary: "",
      featureDescription: "",
      requestingEmployee: undefined,
      requestPriority: "LOW",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    formSubmitCb(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="featureSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feature Summary</FormLabel>

              <FormControl>
                <Input
                  placeholder="Write a one-sentence summary for the feature request"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featureDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feature Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Explain your feature request here. remember to be objective and descriptive."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestingEmployee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requesting Employee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Who's making this request ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees?.map((employee: UserProfile) => (
                    <SelectItem key={employee?.id} value={employee?.id}>
                      {employee?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestPriority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How important is this request ?" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>

                  <SelectItem value="MEDIUM">Medium</SelectItem>

                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
